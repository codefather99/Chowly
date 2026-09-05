package com.example.chowly.service.impl;

import com.example.chowly.dto.request.StaffRequest;
import com.example.chowly.dto.response.StaffResponse;

import com.example.chowly.entity.Restaurant;
import com.example.chowly.entity.Staff;

import com.example.chowly.exception.ResourceNotFoundException;

import com.example.chowly.repository.RestaurantRepository;
import com.example.chowly.repository.StaffRepository;

import com.example.chowly.service.StaffService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl
        implements StaffService {

    private final StaffRepository staffRepository;
    private final RestaurantRepository restaurantRepository;

    public StaffServiceImpl(
            StaffRepository staffRepository,
            RestaurantRepository restaurantRepository
    ) {
        this.staffRepository = staffRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public StaffResponse createStaff(
            StaffRequest request
    ) {

        Restaurant restaurant =
                restaurantRepository
                        .findById(request.restaurantId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + request.restaurantId()
                                )
                        );

        Staff staff = Staff.builder()
                .staffId(request.staffId())
                .staffName(request.staffName())
                .staffRole(request.staffRole())
                .restaurant(restaurant)
                .staffNumber(request.staffNumber())
                .build();

        return mapToResponse(
                staffRepository.save(staff)
        );
    }

    @Override
    public List<StaffResponse> getAllStaff() {

        return staffRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public StaffResponse getStaffById(
            String staffId
    ) {

        Staff staff =
                staffRepository.findById(staffId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Staff not found with ID: "
                                                + staffId
                                )
                        );

        return mapToResponse(staff);
    }

    @Override
    public List<StaffResponse> getStaffByRestaurant(
            String restaurantId
    ) {

        return staffRepository
                .findByRestaurantRestaurantId(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public StaffResponse updateStaff(
            String staffId,
            StaffRequest request
    ) {

        Staff staff =
                staffRepository.findById(staffId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Staff not found with ID: "
                                                + staffId
                                )
                        );

        Restaurant restaurant =
                restaurantRepository
                        .findById(request.restaurantId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + request.restaurantId()
                                )
                        );

        staff.setStaffName(request.staffName());
        staff.setStaffRole(request.staffRole());
        staff.setRestaurant(restaurant);
        staff.setStaffNumber(request.staffNumber());

        return mapToResponse(
                staffRepository.save(staff)
        );
    }

    @Override
    public void deleteStaff(
            String staffId
    ) {

        Staff staff =
                staffRepository.findById(staffId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Staff not found with ID: "
                                                + staffId
                                )
                        );

        staffRepository.delete(staff);
    }

    private StaffResponse mapToResponse(
            Staff staff
    ) {

        return new StaffResponse(
                staff.getStaffId(),
                staff.getStaffName(),
                staff.getStaffRole(),
                staff.getRestaurant()
                        .getRestaurantId(),
                staff.getStaffNumber()
        );
    }
}