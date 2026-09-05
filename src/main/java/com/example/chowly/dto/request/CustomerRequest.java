package com.example.chowly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CustomerRequest(

        @NotBlank(message = "Customer ID is required")
        String customerId,

        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @NotBlank(message = "Phone number is required")
        String phoneNumber

) {
}