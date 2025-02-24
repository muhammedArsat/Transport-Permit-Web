package com.example.s5miniProjectBackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CrosConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Added OPTIONS method for preflight requests
                        .allowedOrigins("http://localhost:3000","http://localhost:3001","http://localhost:3002") // Specify your frontend URL
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials (like cookies)
            }
        };
    }
}
