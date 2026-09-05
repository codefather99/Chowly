package com.example.chowly.service.impl;

import com.example.chowly.dto.request.CreatePaymentRequest;
import com.example.chowly.dto.response.PaymentResponse;
import com.example.chowly.entity.Order;
import com.example.chowly.entity.Payment;
import com.example.chowly.enums.OrderStatus;
import com.example.chowly.enums.PaymentStatus;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.OrderRepository;
import com.example.chowly.repository.PaymentRepository;
import com.example.chowly.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public PaymentResponse createPayment(
            CreatePaymentRequest request
    ) {

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: "
                                        + request.orderId()
                        )
                );

        // One payment per order
        if (paymentRepository
                .findByOrderOrderId(request.orderId())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Payment already exists for order: "
                            + request.orderId()
            );
        }

        // Prevent payment for cancelled orders
        if (order.getOrderStatus() == OrderStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "Cannot make payment for a cancelled order"
            );
        }

        LocalDateTime now = LocalDateTime.now();

        Payment payment = Payment.builder()
                .paymentId(generatePaymentId())
                .order(order)
                .customer(order.getCustomer())
                .amount(order.getTotalAmount())
                .paymentMethod(request.paymentMethod())
                .paymentStatus(PaymentStatus.PENDING)
                .transactionReference(
                        generateTransactionReference()
                )
                .createdAt(now)
                .updatedAt(now)
                .build();

        Payment savedPayment =
                paymentRepository.save(payment);

        return mapToResponse(savedPayment);
    }

    @Override
    public PaymentResponse getPaymentById(
            String paymentId
    ) {

        Payment payment =
                paymentRepository.findById(paymentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with ID: "
                                                + paymentId
                                )
                        );

        return mapToResponse(payment);
    }

    @Override
    public PaymentResponse getPaymentByOrderId(
            String orderId
    ) {

        Payment payment =
                paymentRepository
                        .findByOrderOrderId(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found for order: "
                                                + orderId
                                )
                        );

        return mapToResponse(payment);
    }

    @Override
    public List<PaymentResponse> getPaymentsByStatus(
            PaymentStatus paymentStatus
    ) {

        return paymentRepository
                .findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public PaymentResponse updatePaymentStatus(
            String paymentId,
            PaymentStatus paymentStatus
    ) {

        Payment payment =
                paymentRepository.findById(paymentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with ID: "
                                                + paymentId
                                )
                        );

        PaymentStatus currentStatus =
                payment.getPaymentStatus();

        validateStatusTransition(
                currentStatus,
                paymentStatus
        );

        payment.setPaymentStatus(paymentStatus);
        payment.setUpdatedAt(LocalDateTime.now());

        if (paymentStatus == PaymentStatus.SUCCESS) {
            payment.setPaymentDate(LocalDateTime.now());
        }

        Payment savedPayment =
                paymentRepository.save(payment);

        return mapToResponse(savedPayment);
    }

    private void validateStatusTransition(
            PaymentStatus currentStatus,
            PaymentStatus newStatus
    ) {

        if (currentStatus == PaymentStatus.SUCCESS
                && newStatus == PaymentStatus.PENDING) {

            throw new IllegalArgumentException(
                    "A successful payment cannot return to pending"
            );
        }

        if (currentStatus == PaymentStatus.REFUNDED
                && newStatus != PaymentStatus.REFUNDED) {

            throw new IllegalArgumentException(
                    "A refunded payment cannot change to another status"
            );
        }
    }

    private PaymentResponse mapToResponse(
            Payment payment
    ) {

        return new PaymentResponse(
                payment.getPaymentId(),
                payment.getOrder().getOrderId(),
                payment.getAmount(),
                payment.getPaymentMethod(),
                payment.getPaymentStatus(),
                payment.getTransactionReference(),
                payment.getPaymentDate(),
                payment.getCreatedAt(),
                payment.getUpdatedAt()
        );
    }

    private String generatePaymentId() {
        return "PAY-" + UUID.randomUUID();
    }

    private String generateTransactionReference() {
        return "TXN-" + UUID.randomUUID();
    }
}