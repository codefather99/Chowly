package com.example.chowly.controller;

import com.example.chowly.dto.request.MenuRequest;
import com.example.chowly.dto.response.MenuResponse;
import com.example.chowly.service.MenuService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuService menuService;

    public MenuController(
            MenuService menuService
    ) {
        this.menuService = menuService;
    }

    @PostMapping
    public ResponseEntity<MenuResponse> createMenu(
            @Valid @RequestBody MenuRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        menuService.createMenu(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<MenuResponse>>
    getAllMenus() {

        return ResponseEntity.ok(
                menuService.getAllMenus()
        );
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<MenuResponse>
    getMenuById(
            @PathVariable String menuId
    ) {

        return ResponseEntity.ok(
                menuService.getMenuById(menuId)
        );
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<MenuResponse>>
    getMenusByRestaurant(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                menuService.getMenusByRestaurant(
                        restaurantId
                )
        );
    }

    @PutMapping("/{menuId}")
    public ResponseEntity<MenuResponse>
    updateMenu(
            @PathVariable String menuId,

            @Valid
            @RequestBody
            MenuRequest request
    ) {

        return ResponseEntity.ok(
                menuService.updateMenu(
                        menuId,
                        request
                )
        );
    }

    @DeleteMapping("/{menuId}")
    public ResponseEntity<Void>
    deleteMenu(
            @PathVariable String menuId
    ) {

        menuService.deleteMenu(menuId);

        return ResponseEntity
                .noContent()
                .build();
    }
}