package com.example.chowly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CreateComplaintRequest(

        @NotBlank(message = "Customer ID is required")
        String customerId,

        @NotBlank(message = "Order ID is required")
        String orderId,

        @NotBlank(message = "Complaint text is required")
        String complaintText
) {
}