package com.example.chowly.dto.request;

import com.example.chowly.enums.ItemType;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record MenuItemRequest(

        @NotBlank(message = "Menu item ID is required")
        String menuItemId,

        @NotBlank(message = "Menu ID is required")
        String menuId,

        @NotBlank(message = "Item name is required")
        String itemName,

        @NotNull(message = "Price is required")
        @DecimalMin(
                value = "0.01",
                message = "Price must be greater than zero"
        )
        BigDecimal price,

        @NotNull(message = "Item type is required")
        ItemType itemType

) {
}