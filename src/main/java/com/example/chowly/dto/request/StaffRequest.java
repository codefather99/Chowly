package com.example.chowly.dto.request;

import com.example.chowly.enums.StaffRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StaffRequest(

        @NotBlank(message = "Staff ID is required")
        String staffId,

        @NotBlank(message = "Staff name is required")
        String staffName,

        @NotNull(message = "Staff role is required")
        StaffRole staffRole,

        @NotBlank(message = "Restaurant ID is required")
        String restaurantId,

        @NotBlank(message = "Staff number is required")
        String staffNumber

) {
}