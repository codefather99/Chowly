package com.example.chowly.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateRatingRequest(

        @NotBlank(message = "Customer ID is required")
        String customerId,

        @NotBlank(message = "Order ID is required")
        String orderId,

        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating cannot be greater than 5")
        Integer ratingScore,

        String reviewText
) {
}