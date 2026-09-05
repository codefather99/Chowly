package com.example.chowly.dto.request;

import com.example.chowly.enums.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePaymentRequest(

        @NotBlank(message = "Order ID is required")
        String orderId,

        @NotNull(message = "Payment method is required")
        PaymentMethod paymentMethod
) {
}