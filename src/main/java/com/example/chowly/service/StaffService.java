package com.example.chowly.service;

import com.example.chowly.dto.request.StaffRequest;
import com.example.chowly.dto.response.StaffResponse;

import java.util.List;

public interface StaffService {

    StaffResponse createStaff(
            StaffRequest request
    );

    List<StaffResponse> getAllStaff();

    StaffResponse getStaffById(
            String staffId
    );

    List<StaffResponse> getStaffByRestaurant(
            String restaurantId
    );

    StaffResponse updateStaff(
            String staffId,
            StaffRequest request
    );

    void deleteStaff(
            String staffId
    );
}