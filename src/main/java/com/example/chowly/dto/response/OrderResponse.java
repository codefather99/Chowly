package com.example.chowly.dto.response;

import com.example.chowly.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(

        String orderId,
        String customerId,
        String restaurantId,
        LocalDateTime orderDate,
        OrderStatus orderStatus,
        BigDecimal totalAmount,
        List<OrderItemResponse> items,
        WaitingTimeResponse waitingTime

) {
}