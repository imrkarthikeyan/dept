package com.itdept.it.dto;

import com.itdept.it.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Role role;

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

    public AuthResponse() {
    }
}
