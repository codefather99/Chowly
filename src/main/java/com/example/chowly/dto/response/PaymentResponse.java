package com.example.chowly.dto.response;

import com.example.chowly.enums.PaymentMethod;
import com.example.chowly.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(

        String paymentId,

        String orderId,

        BigDecimal amount,

        PaymentMethod paymentMethod,

        PaymentStatus paymentStatus,

        String transactionReference,

        LocalDateTime paymentDate,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {
}