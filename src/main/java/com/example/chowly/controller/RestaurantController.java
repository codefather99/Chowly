package com.example.chowly.controller;

import com.example.chowly.dto.request.RestaurantRequest;
import com.example.chowly.dto.response.RestaurantResponse;
import com.example.chowly.service.RestaurantService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(
            RestaurantService restaurantService
    ) {
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public ResponseEntity<RestaurantResponse> createRestaurant(
            @Valid @RequestBody RestaurantRequest request
    ) {

        RestaurantResponse response =
                restaurantService.createRestaurant(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<RestaurantResponse>>
    getAllRestaurants() {

        return ResponseEntity.ok(
                restaurantService.getAllRestaurants()
        );
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<RestaurantResponse>
    getRestaurantById(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                restaurantService.getRestaurantById(
                        restaurantId
                )
        );
    }

    @PutMapping("/{restaurantId}")
    public ResponseEntity<RestaurantResponse>
    updateRestaurant(
            @PathVariable String restaurantId,

            @Valid
            @RequestBody
            RestaurantRequest request
    ) {

        return ResponseEntity.ok(
                restaurantService.updateRestaurant(
                        restaurantId,
                        request
                )
        );
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<Void>
    deleteRestaurant(
            @PathVariable String restaurantId
    ) {

        restaurantService.deleteRestaurant(
                restaurantId
        );

        return ResponseEntity.noContent().build();
    }
}