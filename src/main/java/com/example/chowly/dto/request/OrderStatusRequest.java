package com.example.chowly.dto.request;

import com.example.chowly.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusRequest(

        @NotNull(message = "Order status is required")
        OrderStatus orderStatus

) {
}