package com.example.chowly.service;

import com.example.chowly.dto.request.CreateOrderRequest;
import com.example.chowly.dto.response.OrderResponse;
import com.example.chowly.enums.OrderStatus;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(
            CreateOrderRequest request
    );

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(
            String orderId
    );

    List<OrderResponse> getOrdersByCustomer(
            String customerId
    );

    List<OrderResponse> getOrdersByRestaurant(
            String restaurantId
    );

    List<OrderResponse> getOrdersByStatus(
            OrderStatus orderStatus
    );

    OrderResponse updateOrderStatus(
            String orderId,
            OrderStatus orderStatus
    );

    void cancelOrder(
            String orderId
    );
}