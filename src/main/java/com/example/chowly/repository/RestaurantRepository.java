package com.example.chowly.repository;

import com.example.chowly.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository
        extends JpaRepository<Restaurant, String> {
}