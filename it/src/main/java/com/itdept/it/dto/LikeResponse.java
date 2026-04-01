package com.itdept.it.dto;

public class LikeResponse {
    private Long id;
    private String userName;
    private String userRole;
    private String userEmail;

    public LikeResponse() {}

    public LikeResponse(Long id, String userName, String userRole, String userEmail) {
        this.id = id;
        this.userName = userName;
        this.userRole = userRole;
        this.userEmail = userEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
