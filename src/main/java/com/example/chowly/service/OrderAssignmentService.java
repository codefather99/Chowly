package com.example.chowly.service;

import com.example.chowly.dto.request.OrderAssignmentRequest;
import com.example.chowly.dto.response.OrderAssignmentResponse;

import java.util.List;

public interface OrderAssignmentService {

    OrderAssignmentResponse assignStaffToOrder(
            OrderAssignmentRequest request
    );

    OrderAssignmentResponse getAssignmentById(
            String assignmentId
    );

    OrderAssignmentResponse getAssignmentByOrderId(
            String orderId
    );

    List<OrderAssignmentResponse> getAssignmentsByStaffId(
            String staffId
    );

    OrderAssignmentResponse updateAssignment(
            String assignmentId,
            OrderAssignmentRequest request
    );

    void deleteAssignment(String assignmentId);
}