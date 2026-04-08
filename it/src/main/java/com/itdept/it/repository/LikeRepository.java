package com.itdept.it.repository;

import com.itdept.it.model.Blog;
import com.itdept.it.model.Like;
import com.itdept.it.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndBlog(User user, Blog blog);

    long countByBlog(Blog blog);

    long countByUser(User user);

    List<Like> findByUser(User user);

    List<Like> findByBlogOrderByIdDesc(Blog blog);

    @Query(value = """
            SELECT l.blog_id
            FROM likes l
            JOIN blogs b ON b.id = l.blog_id
            WHERE b.status = 'APPROVED' AND l.created_at >= :windowStart
            GROUP BY l.blog_id
            ORDER BY COUNT(*) DESC
            LIMIT 3
            """, nativeQuery = true)
    List<Long> findTopBlogIdsByLikesInWindow(@Param("windowStart") LocalDateTime windowStart);
}
