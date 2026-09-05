package com.example.chowly.service;

import com.example.chowly.dto.request.CreatePaymentRequest;
import com.example.chowly.dto.response.PaymentResponse;
import com.example.chowly.enums.PaymentStatus;

import java.util.List;

public interface PaymentService {

    PaymentResponse createPayment(
            CreatePaymentRequest request
    );

    PaymentResponse getPaymentById(
            String paymentId
    );

    PaymentResponse getPaymentByOrderId(
            String orderId
    );

    List<PaymentResponse> getPaymentsByStatus(
            PaymentStatus paymentStatus
    );

    PaymentResponse updatePaymentStatus(
            String paymentId,
            PaymentStatus paymentStatus
    );
}