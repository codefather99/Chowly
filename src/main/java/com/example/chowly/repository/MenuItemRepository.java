package com.example.chowly.repository;

import com.example.chowly.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository
        extends JpaRepository<MenuItem, String> {

    List<MenuItem> findByMenuMenuId(String menuId);
}