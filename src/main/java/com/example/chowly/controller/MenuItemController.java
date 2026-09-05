package com.example.chowly.controller;

import com.example.chowly.dto.request.MenuItemRequest;
import com.example.chowly.dto.response.MenuItemResponse;
import com.example.chowly.service.MenuItemService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(
            MenuItemService menuItemService
    ) {
        this.menuItemService = menuItemService;
    }

    @PostMapping
    public ResponseEntity<MenuItemResponse>
    createMenuItem(
            @Valid @RequestBody MenuItemRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        menuItemService.createMenuItem(
                                request
                        )
                );
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponse>>
    getAllMenuItems() {

        return ResponseEntity.ok(
                menuItemService.getAllMenuItems()
        );
    }

    @GetMapping("/{menuItemId}")
    public ResponseEntity<MenuItemResponse>
    getMenuItemById(
            @PathVariable String menuItemId
    ) {

        return ResponseEntity.ok(
                menuItemService.getMenuItemById(
                        menuItemId
                )
        );
    }

    @GetMapping("/menu/{menuId}")
    public ResponseEntity<List<MenuItemResponse>>
    getMenuItemsByMenu(
            @PathVariable String menuId
    ) {

        return ResponseEntity.ok(
                menuItemService.getMenuItemsByMenu(
                        menuId
                )
        );
    }

    @PutMapping("/{menuItemId}")
    public ResponseEntity<MenuItemResponse>
    updateMenuItem(
            @PathVariable String menuItemId,

            @Valid
            @RequestBody
            MenuItemRequest request
    ) {

        return ResponseEntity.ok(
                menuItemService.updateMenuItem(
                        menuItemId,
                        request
                )
        );
    }

    @DeleteMapping("/{menuItemId}")
    public ResponseEntity<Void>
    deleteMenuItem(
            @PathVariable String menuItemId
    ) {

        menuItemService.deleteMenuItem(menuItemId);

        return ResponseEntity
                .noContent()
                .build();
    }
}