package com.itdept.it.service;

import com.itdept.it.dto.AuthResponse;
import com.itdept.it.dto.UserResponse;
import com.itdept.it.model.User;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository  userRepository;

    public UserResponse register(User user) {

        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already exists!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // convert to DTO
        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(String email, String password){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(email);

        return new AuthResponse(token, user.getRole());
    }
}
