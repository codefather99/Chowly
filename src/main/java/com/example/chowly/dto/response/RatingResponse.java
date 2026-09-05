package com.example.chowly.dto.response;

import java.time.LocalDateTime;

public record RatingResponse(

        String ratingId,

        String customerId,

        String customerName,

        String restaurantId,

        String restaurantName,

        String orderId,

        Integer ratingScore,

        String reviewText,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {
}