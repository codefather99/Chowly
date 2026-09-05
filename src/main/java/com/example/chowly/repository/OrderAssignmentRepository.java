package com.example.chowly.repository;

import com.example.chowly.entity.OrderAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderAssignmentRepository
        extends JpaRepository<OrderAssignment, String> {

    Optional<OrderAssignment> findByOrderOrderId(String orderId);

    List<OrderAssignment> findByStaffStaffId(String staffId);
}