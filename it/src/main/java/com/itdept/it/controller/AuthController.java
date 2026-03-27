package com.itdept.it.controller;

import com.itdept.it.dto.AuthResponse;
import com.itdept.it.dto.LoginRequest;
import com.itdept.it.dto.UserResponse;
import com.itdept.it.model.User;
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

    @PostMapping("/register")
    public UserResponse register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return userService.login(request.getEmail(), request.getPassword());
    }
}
