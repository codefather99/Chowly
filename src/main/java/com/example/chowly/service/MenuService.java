package com.example.chowly.service;

import com.example.chowly.dto.request.MenuRequest;
import com.example.chowly.dto.response.MenuResponse;

import java.util.List;

public interface MenuService {

    MenuResponse createMenu(
            MenuRequest request
    );

    List<MenuResponse> getAllMenus();

    MenuResponse getMenuById(
            String menuId
    );

    List<MenuResponse> getMenusByRestaurant(
            String restaurantId
    );

    MenuResponse updateMenu(
            String menuId,
            MenuRequest request
    );

    void deleteMenu(
            String menuId
    );
}