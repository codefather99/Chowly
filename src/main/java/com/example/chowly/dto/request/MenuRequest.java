package com.example.chowly.dto.request;

import com.example.chowly.enums.MenuType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MenuRequest(

        @NotBlank(message = "Menu ID is required")
        String menuId,

        @NotBlank(message = "Restaurant ID is required")
        String restaurantId,

        @NotBlank(message = "Menu name is required")
        String menuName,

        @NotNull(message = "Menu type is required")
        MenuType menuType

) {
}