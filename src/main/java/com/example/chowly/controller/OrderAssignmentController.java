package com.example.chowly.controller;

import com.example.chowly.dto.request.OrderAssignmentRequest;
import com.example.chowly.dto.response.OrderAssignmentResponse;
import com.example.chowly.service.OrderAssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-assignments")
@RequiredArgsConstructor
public class OrderAssignmentController {

    private final OrderAssignmentService orderAssignmentService;

    @PostMapping
    public ResponseEntity<OrderAssignmentResponse> assignStaffToOrder(
            @Valid @RequestBody OrderAssignmentRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        orderAssignmentService
                                .assignStaffToOrder(request)
                );
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<OrderAssignmentResponse> getAssignmentById(
            @PathVariable String assignmentId
    ) {

        return ResponseEntity.ok(
                orderAssignmentService
                        .getAssignmentById(assignmentId)
        );
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<OrderAssignmentResponse> getAssignmentByOrderId(
            @PathVariable String orderId
    ) {

        return ResponseEntity.ok(
                orderAssignmentService
                        .getAssignmentByOrderId(orderId)
        );
    }

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<OrderAssignmentResponse>>
    getAssignmentsByStaffId(
            @PathVariable String staffId
    ) {

        return ResponseEntity.ok(
                orderAssignmentService
                        .getAssignmentsByStaffId(staffId)
        );
    }

    @PutMapping("/{assignmentId}")
    public ResponseEntity<OrderAssignmentResponse> updateAssignment(
            @PathVariable String assignmentId,
            @Valid @RequestBody OrderAssignmentRequest request
    ) {

        return ResponseEntity.ok(
                orderAssignmentService.updateAssignment(
                        assignmentId,
                        request
                )
        );
    }

    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<Void> deleteAssignment(
            @PathVariable String assignmentId
    ) {

        orderAssignmentService.deleteAssignment(assignmentId);

        return ResponseEntity.noContent().build();
    }
}