package com.example.chowly.dto.response;

import com.example.chowly.enums.ComplaintStatus;

import java.time.LocalDateTime;

public record CustomerComplaintResponse(

        String complaintId,

        String customerId,

        String customerName,

        String restaurantId,

        String restaurantName,

        String orderId,

        String complaintText,

        ComplaintStatus complaintStatus,

        LocalDateTime createdAt,

        LocalDateTime updatedAt,

        LocalDateTime resolvedAt
) {
}