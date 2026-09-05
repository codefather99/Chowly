package com.example.chowly.service;

import com.example.chowly.dto.request.MenuItemRequest;
import com.example.chowly.dto.response.MenuItemResponse;

import java.util.List;

public interface MenuItemService {

    MenuItemResponse createMenuItem(
            MenuItemRequest request
    );

    List<MenuItemResponse> getAllMenuItems();

    MenuItemResponse getMenuItemById(
            String menuItemId
    );

    List<MenuItemResponse> getMenuItemsByMenu(
            String menuId
    );

    MenuItemResponse updateMenuItem(
            String menuItemId,
            MenuItemRequest request
    );

    void deleteMenuItem(
            String menuItemId
    );
}