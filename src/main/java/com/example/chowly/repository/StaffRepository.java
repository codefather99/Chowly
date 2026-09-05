package com.example.chowly.repository;

import com.example.chowly.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository
        extends JpaRepository<Staff, String> {

    List<Staff> findByRestaurantRestaurantId(String restaurantId);
}