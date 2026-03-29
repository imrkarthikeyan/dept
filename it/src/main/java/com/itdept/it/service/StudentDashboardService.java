package com.itdept.it.service;

import com.itdept.it.dto.BlogResponse;
import com.itdept.it.dto.StudentStatsResponse;
import com.itdept.it.model.Blog;
import com.itdept.it.model.Like;
import com.itdept.it.model.User;
import com.itdept.it.repository.BlogRepository;
import com.itdept.it.repository.LikeRepository;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentDashboardService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeRepository likeRepository;

    // Get feed – only approved blogs
    public List<BlogResponse> getApprovedBlogs() {
        return blogRepository.findByStatus(Blog.Status.APPROVED).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get student’s own blogs
    public List<BlogResponse> getMyBlogs(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired user session"));

        return blogRepository.findByAuthor(student).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get student streak
    public int getMyStreak(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired user session"));
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

    public List<BlogResponse> getLikedBlogs(String email) {
        try {
            User student = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired user session"));

            List<Like> likes = likeRepository.findByUser(student);
            
            return likes.stream()
                    .map(Like::getBlog)
                    .filter(blog -> blog != null)
                    .sorted(Comparator.comparing(Blog::getDate, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error in getLikedBlogs: " + e.getMessage());
            e.printStackTrace();
            return new java.util.ArrayList<>();
        }
    }

    public StudentStatsResponse getStudentStats(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired user session"));

        List<Blog> myBlogs = blogRepository.findByAuthor(student);
        int totalBlogs = myBlogs.size();
        int likesReceived = myBlogs.stream().mapToInt(Blog::getLikesCount).sum();
        int likesGiven = (int) likeRepository.countByUser(student);
        double avgLikes = totalBlogs == 0 ? 0.0 : (double) likesReceived / totalBlogs;

        StudentStatsResponse response = new StudentStatsResponse();
        response.setTotalBlogsCreated(totalBlogs);
        response.setTotalLikesReceived(likesReceived);
        response.setTotalLikesGiven(likesGiven);
        response.setCurrentStreak(student.getStreak());
        response.setLongestStreak(Math.max(student.getLongestStreak(), student.getStreak()));
        response.setTotalViews(null);
        response.setAverageLikesPerBlog(avgLikes);
        return response;
    }

    private BlogResponse mapToResponse(Blog blog) {
        BlogResponse response = new BlogResponse();
        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setContent(blog.getContent());
        response.setAuthorName(blog.getAuthor() != null ? blog.getAuthor().getName() : "Unknown");
        response.setAuthorRole(blog.getAuthor() != null && blog.getAuthor().getRole() != null ? blog.getAuthor().getRole().name() : "UNKNOWN");
        response.setDate(blog.getDate() != null ? blog.getDate().toString() : "");
        response.setLikesCount(blog.getLikesCount());
        response.setStatus(blog.getStatus());
        return response;
    }
}
