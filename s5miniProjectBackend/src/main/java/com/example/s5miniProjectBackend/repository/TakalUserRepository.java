package com.example.s5miniProjectBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.s5miniProjectBackend.entity.TakalUser;

import java.util.List;

@Repository
public interface TakalUserRepository extends JpaRepository<TakalUser, Integer> {

    List<TakalUser> findByStatus(String pending);

}