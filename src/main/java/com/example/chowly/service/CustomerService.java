package com.example.chowly.service;


import com.example.chowly.dto.request.CustomerRequest;
import com.example.chowly.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponse createCustomer(
            CustomerRequest request
    );

    List<CustomerResponse> getAllCustomers();

    CustomerResponse getCustomerById(
            String customerId
    );

    CustomerResponse updateCustomer(
            String customerId,
            CustomerRequest request
    );

    void deleteCustomer(
            String customerId
    );
}