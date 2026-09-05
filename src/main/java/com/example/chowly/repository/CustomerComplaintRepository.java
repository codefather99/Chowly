package com.example.chowly.repository;

import com.example.chowly.entity.CustomerComplaint;
import com.example.chowly.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerComplaintRepository
        extends JpaRepository<CustomerComplaint, String> {

    List<CustomerComplaint> findByOrderOrderId(String orderId);

    List<CustomerComplaint> findByCustomerCustomerId(String customerId);

    List<CustomerComplaint> findByRestaurantRestaurantId(
            String restaurantId
    );

    List<CustomerComplaint> findByComplaintStatus(
            ComplaintStatus complaintStatus
    );

    boolean existsByOrderOrderId(String orderId);
}