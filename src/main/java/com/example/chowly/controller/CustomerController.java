package com.example.chowly.controller;

import com.example.chowly.dto.request.CustomerRequest;
import com.example.chowly.dto.response.CustomerResponse;
import com.example.chowly.service.CustomerService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(
            CustomerService customerService
    ) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        customerService.createCustomer(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponse>>
    getAllCustomers() {

        return ResponseEntity.ok(
                customerService.getAllCustomers()
        );
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerResponse>
    getCustomerById(
            @PathVariable String customerId
    ) {

        return ResponseEntity.ok(
                customerService.getCustomerById(customerId)
        );
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerResponse>
    updateCustomer(
            @PathVariable String customerId,

            @Valid
            @RequestBody
            CustomerRequest request
    ) {

        return ResponseEntity.ok(
                customerService.updateCustomer(
                        customerId,
                        request
                )
        );
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void>
    deleteCustomer(
            @PathVariable String customerId
    ) {

        customerService.deleteCustomer(customerId);

        return ResponseEntity
                .noContent()
                .build();
    }
}