package com.example.chowly.dto.response;

import com.example.chowly.enums.MenuType;

public record MenuResponse(

        String menuId,
        String restaurantId,
        String menuName,
        MenuType menuType

) {
}