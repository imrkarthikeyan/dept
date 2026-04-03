package com.itdept.it.config;

import com.itdept.it.model.Role;
import com.itdept.it.model.User;
import com.itdept.it.repository.UserRepository;
import com.itdept.it.service.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.JwtException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        final String authHeader = request.getHeader("Authorization");
//
//        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractEmail(token);
//
//        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//            UsernamePasswordAuthenticationToken authToken =
//                    new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
//
//            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContextHolder.getContext().setAuthentication(authToken);
//        }
//
//        filterChain.doFilter(request, response);
//    }


    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        String requestPath = request.getRequestURI();

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            if (requestPath.startsWith("/api/student") || requestPath.startsWith("/api/blogs")) {
                System.err.println("⚠️  No Authorization header for: " + requestPath);
            }
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        try {
            String email = jwtUtil.extractEmail(token);
            System.out.println("✓ JWT email extracted: " + email);

            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Role role = jwtUtil.extractRole(token);
                System.out.println("✓ JWT role extracted: " + role);
                
                if (role == null) {
                    User user = userRepository.findByEmail(email).orElse(null);
                    role = user != null ? user.getRole() : null;
                    System.out.println("✓ Role from DB: " + role);
                }

                if(role != null) {
                    System.out.println("✓ Setting authority: " + role.name() + " for path: " + requestPath);
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                            List.of(
                                new SimpleGrantedAuthority(role.name()),
                                new SimpleGrantedAuthority("ROLE_" + role.name())
                            )
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    System.err.println("❌ Role is null for email: " + email);
                }
            }
        } catch (JwtException | IllegalArgumentException ex) {
            System.err.println("❌ JWT Exception: " + ex.getMessage());
            ex.printStackTrace();
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}