package com.itdept.it.service;

import com.itdept.it.dto.AuthResponse;
import com.itdept.it.dto.MessageResponse;
import com.itdept.it.dto.RegisterWithOtpRequest;
import com.itdept.it.dto.UserResponse;
import com.itdept.it.model.Role;
import com.itdept.it.model.User;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Pattern;

@Service
public class UserService {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final String COLLEGE_EMAIL_DOMAIN = "ksrct.net";

    private static class OtpEntry {
        private final String otp;
        private final Instant expiresAt;

        private OtpEntry(String otp, Instant expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }
    }

    private final Map<String, OtpEntry> registerOtpStore = new ConcurrentHashMap<>();

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository  userRepository;
    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.otp.expiry-minutes:10}")
    private long otpExpiryMinutes;

    @Value("${app.mail.from:}")
    private String mailFrom;

    public MessageResponse requestRegistrationOtp(String email) {
        String normalizedEmail = normalizeAndValidateEmail(email);

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists!");
        }

        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1000000));
        Instant expiresAt = Instant.now().plusSeconds(Math.max(1, otpExpiryMinutes) * 60L);

        sendOtpEmail(normalizedEmail, otp);
        registerOtpStore.put(normalizedEmail, new OtpEntry(otp, expiresAt));

        return new MessageResponse("OTP sent to your email. Use it to complete registration.");
    }

    public UserResponse register(RegisterWithOtpRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid registration payload");
        }

        String normalizedEmail = normalizeAndValidateEmail(request.getEmail());
        String name = request.getName() != null ? request.getName().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";
        String otp = request.getOtp() != null ? request.getOtp().trim() : "";
        Role role = request.getRole() != null ? request.getRole() : Role.STUDENT;
        boolean otpRequired = !isCollegeEmail(normalizedEmail);

        if (name.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name is required");
        }

        if (password.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters");
        }

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists!");
        }

        if (otpRequired) {
            if (otp.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP is required");
            }

            OtpEntry entry = registerOtpStore.get(normalizedEmail);
            if (entry == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP not requested for this email");
            }

            if (Instant.now().isAfter(entry.expiresAt)) {
                registerOtpStore.remove(normalizedEmail);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired. Please request a new OTP.");
            }

            if (!entry.otp.equals(otp)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
            }

            registerOtpStore.remove(normalizedEmail);
        } else {
            // No OTP flow for approved college email IDs.
            registerOtpStore.remove(normalizedEmail);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(normalizedEmail);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(user);

        // convert to DTO
        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    private String normalizeAndValidateEmail(String email) {
        String normalized = email != null ? email.trim().toLowerCase() : "";
        if (normalized.isEmpty() || !EMAIL_PATTERN.matcher(normalized).matches()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email address");
        }
        return normalized;
    }

    private boolean isCollegeEmail(String email) {
        if (email == null) {
            return false;
        }

        String normalized = email.trim().toLowerCase();
        int atIndex = normalized.lastIndexOf('@');
        if (atIndex < 0 || atIndex == normalized.length() - 1) {
            return false;
        }

        String domain = normalized.substring(atIndex + 1);
        return domain.equals(COLLEGE_EMAIL_DOMAIN) || domain.endsWith("." + COLLEGE_EMAIL_DOMAIN);
    }

    private void sendOtpEmail(String toEmail, String otp) {
        if (mailSender == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Email service is not configured. Contact admin.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        if (mailFrom != null && !mailFrom.trim().isEmpty()) {
            message.setFrom(mailFrom.trim());
        }
        message.setTo(toEmail);
        message.setSubject("Your BlogSpot Signup OTP");
        message.setText("Your OTP for BlogSpot registration is: " + otp
                + "\n\nThis OTP expires in " + Math.max(1, otpExpiryMinutes)
                + " minutes. Do  not share this code with anyone.");

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Failed to send OTP email. Please try again later.");
        }
    }

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(String email, String password){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtUtil.generateToken(email, user.getRole());

        return new AuthResponse(token, user.getRole(), user.getName(), user.getEmail());
    }
}
