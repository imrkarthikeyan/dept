package com.itdept.it.service;

import com.itdept.it.model.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

//    private final String SECRET = "secret123secret123secret123"; // must be long
//    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String SECRET = "myverysecuresecretkeymyverysecure12345";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

    public String generateToken(String email) {
        return generateToken(email, null);
    }

    public String generateToken(String email, Role role) {
        JwtBuilder builder = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME));

        if (role != null) {
            builder.claim("role", role.name());
        }

        return builder
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Role extractRole(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String roleValue = claims.get("role", String.class);
        if (roleValue == null || roleValue.isBlank()) {
            return null;
        }

        try {
            return Role.valueOf(roleValue);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}