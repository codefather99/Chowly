package com.example.chowly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RestaurantRequest(

        @NotBlank(message = "Restaurant ID is required")
        String restaurantId,

        @NotBlank(message = "Restaurant name is required")
        String restaurantName,

        @NotBlank(message = "Location is required")
        String location

) {
}