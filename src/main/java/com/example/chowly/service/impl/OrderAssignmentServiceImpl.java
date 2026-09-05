package com.example.chowly.service.impl;

import com.example.chowly.dto.request.OrderAssignmentRequest;
import com.example.chowly.dto.response.OrderAssignmentResponse;
import com.example.chowly.entity.Order;
import com.example.chowly.entity.OrderAssignment;
import com.example.chowly.entity.Staff;
import com.example.chowly.enums.AssignmentStatus;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.OrderAssignmentRepository;
import com.example.chowly.repository.OrderRepository;
import com.example.chowly.repository.StaffRepository;
import com.example.chowly.service.OrderAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderAssignmentServiceImpl
        implements OrderAssignmentService {

    private final OrderAssignmentRepository orderAssignmentRepository;
    private final OrderRepository orderRepository;
    private final StaffRepository staffRepository;

    @Override
    @Transactional
    public OrderAssignmentResponse assignStaffToOrder(
            OrderAssignmentRequest request
    ) {

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: " + request.orderId()
                        )
                );

        Staff staff = staffRepository.findById(request.staffId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found with ID: " + request.staffId()
                        )
                );

        // Make sure this order doesn't already have an assignment
        if (orderAssignmentRepository
                .findByOrderOrderId(request.orderId())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Order already has a staff assignment"
            );
        }

        // Make sure staff belongs to the same restaurant as the order
        if (!staff.getRestaurant()
                .getRestaurantId()
                .equals(order.getRestaurant().getRestaurantId())) {

            throw new IllegalArgumentException(
                    "Staff member does not belong to the restaurant handling this order"
            );
        }

        OrderAssignment assignment = OrderAssignment.builder()
                .orderAssignmentId(generateAssignmentId())
                .order(order)
                .staff(staff)
                .assignedAt(LocalDateTime.now())
                .assignmentStatus(AssignmentStatus.ASSIGNED)
                .build();

        OrderAssignment savedAssignment =
                orderAssignmentRepository.save(assignment);

        return mapToResponse(savedAssignment);
    }

    @Override
    public OrderAssignmentResponse getAssignmentById(
            String assignmentId
    ) {

        OrderAssignment assignment =
                orderAssignmentRepository.findById(assignmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order assignment not found with ID: "
                                                + assignmentId
                                )
                        );

        return mapToResponse(assignment);
    }

    @Override
    public OrderAssignmentResponse getAssignmentByOrderId(
            String orderId
    ) {

        OrderAssignment assignment =
                orderAssignmentRepository
                        .findByOrderOrderId(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "No staff assignment found for order: "
                                                + orderId
                                )
                        );

        return mapToResponse(assignment);
    }

    @Override
    public List<OrderAssignmentResponse> getAssignmentsByStaffId(
            String staffId
    ) {

        return orderAssignmentRepository
                .findByStaffStaffId(staffId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderAssignmentResponse updateAssignment(
            String assignmentId,
            OrderAssignmentRequest request
    ) {

        OrderAssignment assignment =
                orderAssignmentRepository.findById(assignmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order assignment not found with ID: "
                                                + assignmentId
                                )
                        );

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: "
                                        + request.orderId()
                        )
                );

        Staff staff = staffRepository.findById(request.staffId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found with ID: "
                                        + request.staffId()
                        )
                );

        if (!staff.getRestaurant()
                .getRestaurantId()
                .equals(order.getRestaurant().getRestaurantId())) {

            throw new IllegalArgumentException(
                    "Staff member does not belong to the restaurant handling this order"
            );
        }

        assignment.setOrder(order);
        assignment.setStaff(staff);

        return mapToResponse(
                orderAssignmentRepository.save(assignment)
        );
    }

    @Override
    @Transactional
    public void deleteAssignment(String assignmentId) {

        OrderAssignment assignment =
                orderAssignmentRepository.findById(assignmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order assignment not found with ID: "
                                                + assignmentId
                                )
                        );

        orderAssignmentRepository.delete(assignment);
    }

    private OrderAssignmentResponse mapToResponse(
            OrderAssignment assignment
    ) {

        return new OrderAssignmentResponse(
                assignment.getOrderAssignmentId(),
                assignment.getOrder().getOrderId(),
                assignment.getStaff().getStaffId(),
                assignment.getStaff().getStaffName(),
                assignment.getAssignedAt()
        );
    }

    private String generateAssignmentId() {
        return "ASG-" + System.currentTimeMillis();
    }
}