package com.example.chowly.dto.response;

import com.example.chowly.enums.ItemType;

import java.math.BigDecimal;

public record MenuItemResponse(

        String menuItemId,
        String menuId,
        String itemName,
        BigDecimal price,
        ItemType itemType

) {
}