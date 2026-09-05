package com.example.chowly.service.impl;

import com.example.chowly.dto.request.MenuItemRequest;
import com.example.chowly.dto.response.MenuItemResponse;

import com.example.chowly.entity.Menu;
import com.example.chowly.entity.MenuItem;

import com.example.chowly.exception.ResourceNotFoundException;

import com.example.chowly.repository.MenuItemRepository;
import com.example.chowly.repository.MenuRepository;

import com.example.chowly.service.MenuItemService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemServiceImpl
        implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuRepository menuRepository;

    public MenuItemServiceImpl(
            MenuItemRepository menuItemRepository,
            MenuRepository menuRepository
    ) {
        this.menuItemRepository = menuItemRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    public MenuItemResponse createMenuItem(
            MenuItemRequest request
    ) {

        Menu menu =
                menuRepository.findById(request.menuId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu not found with ID: "
                                                + request.menuId()
                                )
                        );

        MenuItem menuItem = MenuItem.builder()
                .menuItemId(request.menuItemId())
                .menu(menu)
                .itemName(request.itemName())
                .price(request.price())
                .itemType(request.itemType())
                .build();

        return mapToResponse(
                menuItemRepository.save(menuItem)
        );
    }

    @Override
    public List<MenuItemResponse> getAllMenuItems() {

        return menuItemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MenuItemResponse getMenuItemById(
            String menuItemId
    ) {

        MenuItem menuItem =
                menuItemRepository.findById(menuItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu item not found with ID: "
                                                + menuItemId
                                )
                        );

        return mapToResponse(menuItem);
    }

    @Override
    public List<MenuItemResponse> getMenuItemsByMenu(
            String menuId
    ) {

        return menuItemRepository
                .findByMenuMenuId(menuId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MenuItemResponse updateMenuItem(
            String menuItemId,
            MenuItemRequest request
    ) {

        MenuItem menuItem =
                menuItemRepository.findById(menuItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu item not found with ID: "
                                                + menuItemId
                                )
                        );

        Menu menu =
                menuRepository.findById(request.menuId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu not found with ID: "
                                                + request.menuId()
                                )
                        );

        menuItem.setMenu(menu);
        menuItem.setItemName(request.itemName());
        menuItem.setPrice(request.price());
        menuItem.setItemType(request.itemType());

        return mapToResponse(
                menuItemRepository.save(menuItem)
        );
    }

    @Override
    public void deleteMenuItem(
            String menuItemId
    ) {

        MenuItem menuItem =
                menuItemRepository.findById(menuItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu item not found with ID: "
                                                + menuItemId
                                )
                        );

        menuItemRepository.delete(menuItem);
    }

    private MenuItemResponse mapToResponse(
            MenuItem menuItem
    ) {

        return new MenuItemResponse(
                menuItem.getMenuItemId(),
                menuItem.getMenu().getMenuId(),
                menuItem.getItemName(),
                menuItem.getPrice(),
                menuItem.getItemType()
        );
    }
}