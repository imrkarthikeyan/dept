package com.itdept.it.repository;

import com.itdept.it.model.Blog;
import com.itdept.it.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogOrderByCreatedAtDesc(Blog blog);
    long countByBlog(Blog blog);
}