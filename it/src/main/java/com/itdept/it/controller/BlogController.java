package com.itdept.it.controller;

import com.itdept.it.dto.BlogRequest;
import com.itdept.it.dto.BlogResponse;
import com.itdept.it.dto.CommentRequest;
import com.itdept.it.dto.CommentResponse;
import com.itdept.it.dto.LikeResponse;
import com.itdept.it.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @PostMapping("/create")
    public BlogResponse createBlog(@RequestBody BlogRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return blogService.createBlog(request, email);
    }

    @GetMapping("/all")
    public List<BlogResponse> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping("/{blogId}/like")
    public BlogResponse likeBlog(@PathVariable Long blogId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return blogService.likeBlog(blogId, email);
    }

    @GetMapping("/all/faculty")
    public List<BlogResponse> getAllBlogsForFaculty() {
        return blogService.getAllBlogsForFaculty();
    }

    @GetMapping("/{blogId}/comments")
    public List<CommentResponse> getBlogComments(@PathVariable Long blogId) {
        return blogService.getComments(blogId);
    }

    @PostMapping("/{blogId}/comments")
    public CommentResponse addComment(@PathVariable Long blogId, @RequestBody CommentRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return blogService.addComment(blogId, request, email);
    }

    @GetMapping("/{blogId}/likes")
    public List<LikeResponse> getBlogLikes(@PathVariable Long blogId) {
        return blogService.getBlogLikes(blogId);
    }

    // Faculty: approve blog
    @PutMapping("/{blogId}/approve")
    public BlogResponse approveBlog(@PathVariable Long blogId) {
        return blogService.approveBlog(blogId);
    }

    // Faculty: reject blog
    @PutMapping("/{blogId}/reject")
    public BlogResponse rejectBlog(@PathVariable Long blogId) {
        return blogService.rejectBlog(blogId);
    }

    // Faculty: delete blog
    @DeleteMapping("/{blogId}")
    public void deleteBlog(@PathVariable Long blogId) {
        blogService.deleteBlog(blogId);
    }
}
