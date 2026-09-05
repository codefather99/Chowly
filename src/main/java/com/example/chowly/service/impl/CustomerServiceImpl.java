package com.example.chowly.service.impl;

import com.example.chowly.dto.request.CustomerRequest;
import com.example.chowly.dto.response.CustomerResponse;
import com.example.chowly.entity.Customer;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.CustomerRepository;
import com.example.chowly.service.CustomerService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl
        implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(
            CustomerRepository customerRepository
    ) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerResponse createCustomer(
            CustomerRequest request
    ) {

        Customer customer = Customer.builder()
                .customerId(request.customerId())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .phoneNumber(request.phoneNumber())
                .build();

        return mapToResponse(
                customerRepository.save(customer)
        );
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CustomerResponse getCustomerById(
            String customerId
    ) {

        Customer customer =
                customerRepository.findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with ID: "
                                                + customerId
                                )
                        );

        return mapToResponse(customer);
    }

    @Override
    public CustomerResponse updateCustomer(
            String customerId,
            CustomerRequest request
    ) {

        Customer customer =
                customerRepository.findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with ID: "
                                                + customerId
                                )
                        );

        customer.setFirstName(
                request.firstName()
        );

        customer.setLastName(
                request.lastName()
        );

        customer.setPhoneNumber(
                request.phoneNumber()
        );

        return mapToResponse(
                customerRepository.save(customer)
        );
    }

    @Override
    public void deleteCustomer(
            String customerId
    ) {

        Customer customer =
                customerRepository.findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with ID: "
                                                + customerId
                                )
                        );

        customerRepository.delete(customer);
    }

    private CustomerResponse mapToResponse(
            Customer customer
    ) {

        return new CustomerResponse(
                customer.getCustomerId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber()
        );
    }
}