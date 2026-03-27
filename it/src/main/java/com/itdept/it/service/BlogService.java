package com.itdept.it.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.itdept.it.dto.BlogRequest;
import com.itdept.it.dto.BlogResponse;
import com.itdept.it.model.Blog;
import com.itdept.it.model.Like;
import com.itdept.it.model.User;
import com.itdept.it.repository.BlogRepository;
import com.itdept.it.repository.LikeRepository;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeRepository likeRepository;

    // Create blog with streak check
    public BlogResponse createBlog(BlogRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        LocalDate lastPostDate = author.getLastPostDate();

        // Streak logic
        if (lastPostDate != null) {
            long daysBetween = ChronoUnit.DAYS.between(lastPostDate, today);
            if (daysBetween == 1) {
                author.setStreak(author.getStreak() + 1); // consecutive day → increment
            } else if (daysBetween > 1) {
                author.setStreak(1); // missed day → reset to 1
            }
        } else {
            author.setStreak(1); // first post
        }

        author.setLastPostDate(today);
        userRepository.save(author);

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setAuthor(author);
        blog.setDate(today);

        Blog savedBlog = blogRepository.save(blog);

        return mapToResponse(savedBlog);
    }

    // Like/Unlike blog
    public BlogResponse likeBlog(Long blogId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        // Check if already liked
        Like like = likeRepository.findByUserAndBlog(user, blog).orElse(null);

        if (like == null) {
            // Add like
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setBlog(blog);
            likeRepository.save(newLike);
        } else {
            // Remove like (toggle)
            likeRepository.delete(like);
        }

        // Update likes count
        blog.setLikesCount((int) likeRepository.countByBlog(blog));
        blogRepository.save(blog);

        return mapToResponse(blog);
    }

    // Get all blogs
    public List<BlogResponse> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get all blogs (faculty can see all, including pending)
    public List<BlogResponse> getAllBlogsForFaculty() {
        return blogRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Approve a blog
    public BlogResponse approveBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        blog.setStatus(Blog.Status.APPROVED);
        blogRepository.save(blog);
        return mapToResponse(blog);
    }

    // Reject a blog
    public BlogResponse rejectBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        blog.setStatus(Blog.Status.REJECTED);
        blogRepository.save(blog);
        return mapToResponse(blog);
    }

    // Delete a blog
    public void deleteBlog(Long blogId) {
        blogRepository.deleteById(blogId);
    }


    private BlogResponse mapToResponse(Blog blog) {
        BlogResponse response = new BlogResponse();
        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setContent(blog.getContent());
        response.setAuthorName(blog.getAuthor().getName());
        response.setDate(blog.getDate().toString());
        response.setLikesCount(blog.getLikesCount());
        response.setStatus(blog.getStatus());  //new field for status
        return response;
    }
}