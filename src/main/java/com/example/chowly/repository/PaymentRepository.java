package com.example.chowly.repository;

import com.example.chowly.entity.Payment;
import com.example.chowly.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface PaymentRepository
        extends JpaRepository<Payment, String> {

    Optional<Payment> findByOrderOrderId(String orderId);

    Optional<Payment> findByCustomerCustomerId(String customerId);

    Optional<Payment> findByTransactionReference(
            String transactionReference
    );

    List<Payment> findByPaymentStatus(
            PaymentStatus paymentStatus
    );
}
