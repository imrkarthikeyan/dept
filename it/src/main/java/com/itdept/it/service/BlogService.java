package com.itdept.it.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.itdept.it.dto.BlogContentAnalysisResponse;
import com.itdept.it.dto.BlogRequest;
import com.itdept.it.dto.BlogResponse;
import com.itdept.it.dto.CommentRequest;
import com.itdept.it.dto.CommentResponse;
import com.itdept.it.dto.LikeResponse;
import com.itdept.it.model.Blog;
import com.itdept.it.model.Comment;
import com.itdept.it.model.Like;
import com.itdept.it.model.Role;
import com.itdept.it.model.User;
import com.itdept.it.repository.BlogRepository;
import com.itdept.it.repository.CommentRepository;
import com.itdept.it.repository.LikeRepository;
import com.itdept.it.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogContentAnalysisService blogContentAnalysisService;

    // Create blog with streak check
    public BlogResponse createBlog(BlogRequest request, String userEmail) {
        String safeTitle = request != null && request.getTitle() != null ? request.getTitle().trim() : "";
        String safeContent = request != null && request.getContent() != null ? request.getContent().trim() : "";

        if (safeTitle.isBlank() || safeContent.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title and content are required.");
        }

        BlogContentAnalysisResponse analysis = blogContentAnalysisService.analyzeContent(safeTitle, safeContent);
        if (!blogContentAnalysisService.isPublishAllowed(analysis)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, analysis.getMessage());
        }

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

        if (author.getStreak() > author.getLongestStreak()) {
            author.setLongestStreak(author.getStreak());
        }

        author.setLastPostDate(today);
        userRepository.save(author);

        Blog blog = new Blog();
        blog.setTitle(safeTitle);
        blog.setContent(safeContent);
        blog.setAuthor(author);
        blog.setDate(today);

        if (author.getRole() == Role.STAFF || author.getRole() == Role.ADMIN) {
            blog.setStatus(Blog.Status.APPROVED);
        }

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

    public List<CommentResponse> getComments(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        return commentRepository.findByBlogOrderByCreatedAtDesc(blog)
                .stream()
                .map(this::mapCommentToResponse)
                .collect(Collectors.toList());
    }

    public CommentResponse addComment(Long blogId, CommentRequest request, String userEmail) {
        String content = request != null && request.getContent() != null ? request.getContent().trim() : "";
        if (content.isEmpty()) {
            throw new RuntimeException("Comment cannot be empty");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        Comment comment = new Comment();
        comment.setBlog(blog);
        comment.setAuthor(user);
        comment.setContent(content);
        comment.setCreatedAt(java.time.LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return mapCommentToResponse(savedComment);
    }

    public List<LikeResponse> getBlogLikes(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        return likeRepository.findByBlogOrderByIdDesc(blog)
                .stream()
                .map(this::mapLikeToResponse)
                .collect(Collectors.toList());
    }

    private BlogResponse mapToResponse(Blog blog) {
        BlogResponse response = new BlogResponse();
        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setContent(blog.getContent());
        response.setAuthorName(blog.getAuthor().getName());
        response.setAuthorRole(blog.getAuthor() != null && blog.getAuthor().getRole() != null ? blog.getAuthor().getRole().name() : "UNKNOWN");
        response.setDate(blog.getDate().toString());
        response.setLikesCount(blog.getLikesCount());
        response.setCommentsCount((int) commentRepository.countByBlog(blog));
        response.setStatus(blog.getStatus());  //new field for status
        return response;
    }

    private CommentResponse mapCommentToResponse(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setBlogId(comment.getBlog() != null ? comment.getBlog().getId() : null);
        response.setContent(comment.getContent());
        response.setAuthorName(comment.getAuthor() != null ? comment.getAuthor().getName() : "Unknown");
        response.setAuthorRole(comment.getAuthor() != null && comment.getAuthor().getRole() != null
                ? comment.getAuthor().getRole().name()
                : "UNKNOWN");
        response.setCreatedAt(comment.getCreatedAt() != null ? comment.getCreatedAt().toString() : "");
        return response;
    }

    private LikeResponse mapLikeToResponse(Like like) {
        LikeResponse response = new LikeResponse();
        response.setId(like.getId());
        response.setUserName(like.getUser() != null ? like.getUser().getName() : "Unknown");
        response.setUserRole(like.getUser() != null && like.getUser().getRole() != null
                ? like.getUser().getRole().name()
                : "UNKNOWN");
        response.setUserEmail(like.getUser() != null ? like.getUser().getEmail() : "");
        return response;
    }
}
