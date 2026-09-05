package com.example.chowly.dto.response;

import java.math.BigDecimal;

public record OrderItemResponse(

        String orderItemId,
        String menuItemId,
        String itemName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal

) {
}