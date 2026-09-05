package com.example.chowly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record OrderAssignmentRequest(

        @NotBlank(message = "Order ID is required")
        String orderId,

        @NotBlank(message = "Staff ID is required")
        String staffId
) {
}