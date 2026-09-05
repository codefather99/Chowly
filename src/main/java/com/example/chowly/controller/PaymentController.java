package com.example.chowly.controller;

import com.example.chowly.dto.request.CreatePaymentRequest;
import com.example.chowly.dto.response.PaymentResponse;
import com.example.chowly.enums.PaymentStatus;
import com.example.chowly.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(
            @Valid @RequestBody CreatePaymentRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        paymentService.createPayment(request)
                );
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponse> getPaymentById(
            @PathVariable String paymentId
    ) {

        return ResponseEntity.ok(
                paymentService.getPaymentById(paymentId)
        );
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentResponse> getPaymentByOrderId(
            @PathVariable String orderId
    ) {

        return ResponseEntity.ok(
                paymentService.getPaymentByOrderId(orderId)
        );
    }

    @GetMapping("/status/{paymentStatus}")
    public ResponseEntity<List<PaymentResponse>>
    getPaymentsByStatus(
            @PathVariable PaymentStatus paymentStatus
    ) {

        return ResponseEntity.ok(
                paymentService
                        .getPaymentsByStatus(paymentStatus)
        );
    }

    @PatchMapping("/{paymentId}/status")
    public ResponseEntity<PaymentResponse> updatePaymentStatus(
            @PathVariable String paymentId,
            @RequestParam PaymentStatus paymentStatus
    ) {

        return ResponseEntity.ok(
                paymentService.updatePaymentStatus(
                        paymentId,
                        paymentStatus
                )
        );
    }
}