package com.example.chowly.repository;

import com.example.chowly.entity.WaitingTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaitingTimeRepository
        extends JpaRepository<WaitingTime, String> {

    Optional<WaitingTime> findByOrderOrderId(String orderId);
}