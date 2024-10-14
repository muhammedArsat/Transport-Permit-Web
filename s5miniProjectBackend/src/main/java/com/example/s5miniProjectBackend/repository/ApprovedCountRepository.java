package com.example.s5miniProjectBackend.repository;

public interface ApprovedCountRepository {
    long countByStatus(String status);
}
