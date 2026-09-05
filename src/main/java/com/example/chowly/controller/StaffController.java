package com.example.chowly.controller;

import com.example.chowly.dto.request.StaffRequest;
import com.example.chowly.dto.response.StaffResponse;
import com.example.chowly.service.StaffService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(
            StaffService staffService
    ) {
        this.staffService = staffService;
    }

    @PostMapping
    public ResponseEntity<StaffResponse> createStaff(
            @Valid @RequestBody StaffRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        staffService.createStaff(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<StaffResponse>>
    getAllStaff() {

        return ResponseEntity.ok(
                staffService.getAllStaff()
        );
    }

    @GetMapping("/{staffId}")
    public ResponseEntity<StaffResponse>
    getStaffById(
            @PathVariable String staffId
    ) {

        return ResponseEntity.ok(
                staffService.getStaffById(staffId)
        );
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<StaffResponse>>
    getStaffByRestaurant(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                staffService.getStaffByRestaurant(
                        restaurantId
                )
        );
    }

    @PutMapping("/{staffId}")
    public ResponseEntity<StaffResponse>
    updateStaff(
            @PathVariable String staffId,

            @Valid
            @RequestBody
            StaffRequest request
    ) {

        return ResponseEntity.ok(
                staffService.updateStaff(
                        staffId,
                        request
                )
        );
    }

    @DeleteMapping("/{staffId}")
    public ResponseEntity<Void>
    deleteStaff(
            @PathVariable String staffId
    ) {

        staffService.deleteStaff(staffId);

        return ResponseEntity
                .noContent()
                .build();
    }
}