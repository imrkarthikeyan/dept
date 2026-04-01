package com.itdept.it.repository;

import com.itdept.it.model.Blog;
import com.itdept.it.model.Like;
import com.itdept.it.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndBlog(User user, Blog blog);
    long countByBlog(Blog blog);
    long countByUser(User user);
    List<Like> findByUser(User user);
    List<Like> findByBlogOrderByIdDesc(Blog blog);
}
