package com.itdept.it.dto;

public class OtpRequest {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OtpRequest() {
    }

    public OtpRequest(String email) {
        this.email = email;
    }
}
