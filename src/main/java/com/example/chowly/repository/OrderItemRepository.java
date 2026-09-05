package com.example.chowly.repository;

import com.example.chowly.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, String> {

    List<OrderItem> findByOrderOrderId(String orderId);
}