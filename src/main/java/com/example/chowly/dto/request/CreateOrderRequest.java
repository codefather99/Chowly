package com.example.chowly.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateOrderRequest(

        @NotBlank(message = "Customer ID is required")
        String customerId,

        @NotBlank(message = "Restaurant ID is required")
        String restaurantId,

        @NotEmpty(message = "Order must contain at least one item")
        List<@Valid OrderItemRequest> items

) {
}