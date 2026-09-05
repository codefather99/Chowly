package com.example.chowly.controller;

import com.example.chowly.dto.request.CreateComplaintRequest;
import com.example.chowly.dto.request.UpdateComplaintStatusRequest;
import com.example.chowly.dto.response.CustomerComplaintResponse;
import com.example.chowly.enums.ComplaintStatus;
import com.example.chowly.service.CustomerComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class CustomerComplaintController {

    private final CustomerComplaintService complaintService;

    @PostMapping
    public ResponseEntity<CustomerComplaintResponse> createComplaint(
            @Valid @RequestBody CreateComplaintRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        complaintService.createComplaint(request)
                );
    }

    @GetMapping("/{complaintId}")
    public ResponseEntity<CustomerComplaintResponse> getComplaintById(
            @PathVariable String complaintId
    ) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(complaintId)
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerComplaintResponse>>
    getComplaintsByCustomer(
            @PathVariable String customerId
    ) {

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByCustomer(customerId)
        );
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<CustomerComplaintResponse>>
    getComplaintsByRestaurant(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByRestaurant(restaurantId)
        );
    }

    @GetMapping("/status/{complaintStatus}")
    public ResponseEntity<List<CustomerComplaintResponse>>
    getComplaintsByStatus(
            @PathVariable ComplaintStatus complaintStatus
    ) {

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByStatus(complaintStatus)
        );
    }

    @PatchMapping("/{complaintId}/status")
    public ResponseEntity<CustomerComplaintResponse>
    updateComplaintStatus(
            @PathVariable String complaintId,
            @Valid @RequestBody UpdateComplaintStatusRequest request
    ) {

        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(
                        complaintId,
                        request
                )
        );
    }
}