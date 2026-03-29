package com.itdept.it.dto;

import com.itdept.it.model.Role;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Role role;
    private String name;
    private String email;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public AuthResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }

    public AuthResponse(String token, Role role, String name, String email) {
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
    }

    public AuthResponse() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
