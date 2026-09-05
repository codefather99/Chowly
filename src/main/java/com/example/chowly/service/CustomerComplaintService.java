package com.example.chowly.service;

import com.example.chowly.dto.request.CreateComplaintRequest;
import com.example.chowly.dto.request.UpdateComplaintStatusRequest;
import com.example.chowly.dto.response.CustomerComplaintResponse;
import com.example.chowly.enums.ComplaintStatus;

import java.util.List;

public interface CustomerComplaintService {

    CustomerComplaintResponse createComplaint(
            CreateComplaintRequest request
    );

    CustomerComplaintResponse getComplaintById(
            String complaintId
    );

    List<CustomerComplaintResponse> getComplaintsByCustomer(
            String customerId
    );

    List<CustomerComplaintResponse> getComplaintsByRestaurant(
            String restaurantId
    );

    List<CustomerComplaintResponse> getComplaintsByStatus(
            ComplaintStatus complaintStatus
    );

    CustomerComplaintResponse updateComplaintStatus(
            String complaintId,
            UpdateComplaintStatusRequest request
    );
}