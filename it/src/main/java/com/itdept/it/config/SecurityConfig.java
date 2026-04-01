package com.itdept.it.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:5174"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .anyRequest().authenticated()
//                )


//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers("/api/blogs/all/faculty", "/api/blogs/*/approve",
//                                "/api/blogs/*/reject", "/api/blogs/*").hasAnyAuthority("STAFF","ADMIN")
//                        .anyRequest().authenticated()
//                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/error").permitAll()

                        // student endpoints - must come before /api/blogs/* rules
                        .requestMatchers("/api/student/**").hasAuthority("STUDENT")

                        // blog creation - any authenticated user
                        .requestMatchers(HttpMethod.POST, "/api/blogs/create").authenticated()

                        // faculty/admin only - blog management
                        .requestMatchers(HttpMethod.GET, "/api/blogs/all/faculty").hasAnyAuthority("STAFF","ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/blogs/*/approve").hasAnyAuthority("STAFF","ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/blogs/*/reject").hasAnyAuthority("STAFF","ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/blogs/*").hasAnyAuthority("STAFF","ADMIN")

                        // any authenticated user can like blogs
                        .requestMatchers(HttpMethod.POST, "/api/blogs/*/like").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/blogs/*/comments").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/blogs/*/comments").authenticated()

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        http.addFilterBefore(jwtFilter,
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}