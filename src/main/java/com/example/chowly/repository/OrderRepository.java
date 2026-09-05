package com.example.chowly.repository;

import com.example.chowly.entity.Order;
import com.example.chowly.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository
        extends JpaRepository<Order, String> {

    List<Order> findByCustomerCustomerId(String customerId);

    List<Order> findByRestaurantRestaurantId(String restaurantId);

    List<Order> findByOrderStatus(OrderStatus orderStatus);
}