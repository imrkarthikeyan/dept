package com.itdept.it.dto;

import lombok.Data;

@Data
public class BlogRequest {
    private String title;
    private String content;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BlogRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public BlogRequest() {
    }
}
