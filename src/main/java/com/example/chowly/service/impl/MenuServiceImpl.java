package com.example.chowly.service.impl;

import com.example.chowly.dto.request.MenuRequest;
import com.example.chowly.dto.response.MenuResponse;

import com.example.chowly.entity.Menu;
import com.example.chowly.entity.Restaurant;

import com.example.chowly.exception.ResourceNotFoundException;

import com.example.chowly.repository.MenuRepository;
import com.example.chowly.repository.RestaurantRepository;

import com.example.chowly.service.MenuService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl
        implements MenuService {

    private final MenuRepository menuRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuServiceImpl(
            MenuRepository menuRepository,
            RestaurantRepository restaurantRepository
    ) {
        this.menuRepository = menuRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public MenuResponse createMenu(
            MenuRequest request
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

        Menu menu = Menu.builder()
                .menuId(request.menuId())
                .restaurant(restaurant)
                .menuName(request.menuName())
                .menuType(request.menuType())
                .build();

        return mapToResponse(
                menuRepository.save(menu)
        );
    }

    @Override
    public List<MenuResponse> getAllMenus() {

        return menuRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MenuResponse getMenuById(
            String menuId
    ) {

        Menu menu =
                menuRepository.findById(menuId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu not found with ID: "
                                                + menuId
                                )
                        );

        return mapToResponse(menu);
    }

    @Override
    public List<MenuResponse> getMenusByRestaurant(
            String restaurantId
    ) {

        return menuRepository
                .findByRestaurantRestaurantId(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MenuResponse updateMenu(
            String menuId,
            MenuRequest request
    ) {

        Menu menu =
                menuRepository.findById(menuId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu not found with ID: "
                                                + menuId
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

        menu.setRestaurant(restaurant);
        menu.setMenuName(request.menuName());
        menu.setMenuType(request.menuType());

        return mapToResponse(
                menuRepository.save(menu)
        );
    }

    @Override
    public void deleteMenu(
            String menuId
    ) {

        Menu menu =
                menuRepository.findById(menuId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Menu not found with ID: "
                                                + menuId
                                )
                        );

        menuRepository.delete(menu);
    }

    private MenuResponse mapToResponse(
            Menu menu
    ) {

        return new MenuResponse(
                menu.getMenuId(),
                menu.getRestaurant()
                        .getRestaurantId(),
                menu.getMenuName(),
                menu.getMenuType()
        );
    }
}