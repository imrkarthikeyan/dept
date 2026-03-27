package com.itdept.it.repository;

import com.itdept.it.model.Blog;
import com.itdept.it.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByAuthor(User author);
    List<Blog> findByStatus(Blog.Status status);  // approved blogs for feed
    List<Blog> findByAuthor(User author);   // student’s own blogs


    List<Blog> findByStatusOrderByDateDesc(Blog.Status status); // newest first

    List<Blog> findByStatusOrderByLikesCountDesc(Blog.Status status); // most liked first
}
