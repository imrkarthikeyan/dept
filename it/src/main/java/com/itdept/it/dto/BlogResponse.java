package com.itdept.it.dto;

import com.itdept.it.model.Blog;
import lombok.Data;

@Data
public class BlogResponse {
    private Long id;
    private String title;
    private String content;
    private String authorName;
    private String date;
    private int         likesCount;
    private Blog.Status status;

    public BlogResponse(Long id, String title, String content, String authorName, String date, int likesCount, Blog.Status status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorName = authorName;
        this.date = date;
        this.likesCount = likesCount;
        this.status = status;
    }

    public BlogResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public Blog.Status getStatus() {
        return status;
    }

    public void setStatus(Blog.Status status) {
        this.status = status;
    }
}
