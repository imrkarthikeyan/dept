package com.itdept.it.service;

import com.itdept.it.dto.BlogResponse;
import com.itdept.it.model.Blog;
import com.itdept.it.model.User;
import com.itdept.it.repository.BlogRepository;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentDashboardService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    // Get feed – only approved blogs
    public List<BlogResponse> getApprovedBlogs() {
        return blogRepository.findByStatus(Blog.Status.APPROVED).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get student’s own blogs
    public List<BlogResponse> getMyBlogs(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return blogRepository.findByAuthor(student).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get student streak
    public int getMyStreak(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return student.getStreak();
    }

    public List<BlogResponse> getFeedSortedByDate() {
        return blogRepository.findByStatusOrderByDateDesc(Blog.Status.APPROVED)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BlogResponse> getFeedSortedByLikes() {
        return blogRepository.findByStatusOrderByLikesCountDesc(Blog.Status.APPROVED)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BlogResponse mapToResponse(Blog blog) {
        BlogResponse response = new BlogResponse();
        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setContent(blog.getContent());
        response.setAuthorName(blog.getAuthor().getName());
        response.setDate(blog.getDate().toString());
        response.setLikesCount(blog.getLikesCount());
        response.setStatus(blog.getStatus());
        return response;
    }
}
