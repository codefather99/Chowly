package com.example.chowly.repository;

import com.example.chowly.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository
        extends JpaRepository<Menu, String> {

    List<Menu> findByRestaurantRestaurantId(String restaurantId);
}