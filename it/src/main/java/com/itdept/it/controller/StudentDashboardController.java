package com.itdept.it.controller;

import com.itdept.it.dto.BlogResponse;
import com.itdept.it.dto.StudentStatsResponse;
import com.itdept.it.service.StudentDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentDashboardController {
    @Autowired
    private StudentDashboardService studentService;


    // Get feed of approved blogs
    @GetMapping("/feed")
    public List<BlogResponse> getFeed() {
        return studentService.getApprovedBlogs();
    }

    // Get my blogs
    @GetMapping("/my-blogs")
    public List<BlogResponse> getMyBlogs() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return studentService.getMyBlogs(email);
    }

    // Get my streak
    @GetMapping("/streak")
    public int getMyStreak() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return studentService.getMyStreak(email);
    }

    @GetMapping("/feed/date")
    public List<BlogResponse> getFeedByDate() {
        return studentService.getFeedSortedByDate();
    }

    @GetMapping("/feed/likes")
    public List<BlogResponse> getFeedByLikes() {
        return studentService.getFeedSortedByLikes();
    }

    @GetMapping("/liked-blogs")
    public List<BlogResponse> getLikedBlogs() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return studentService.getLikedBlogs(email);
    }

    @GetMapping("/stats")
    public StudentStatsResponse getStudentStats() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return studentService.getStudentStats(email);
    }


}
