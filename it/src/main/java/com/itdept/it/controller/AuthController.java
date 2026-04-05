package com.itdept.it.controller;

import com.itdept.it.dto.AuthResponse;
import com.itdept.it.dto.LoginRequest;
import com.itdept.it.dto.MessageResponse;
import com.itdept.it.dto.OtpRequest;
import com.itdept.it.dto.RegisterWithOtpRequest;
import com.itdept.it.dto.UserResponse;
import com.itdept.it.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register/request-otp")
    public MessageResponse requestRegisterOtp(@RequestBody OtpRequest request) {
        return userService.requestRegistrationOtp(request.getEmail());
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterWithOtpRequest request){
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return userService.login(request.getEmail(), request.getPassword());
    }
}
