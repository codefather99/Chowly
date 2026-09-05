package com.example.chowly.service;

import com.example.chowly.dto.request.RestaurantRequest;
import com.example.chowly.dto.response.RestaurantResponse;

import java.util.List;

public interface RestaurantService {

    RestaurantResponse createRestaurant(
            RestaurantRequest request
    );

    List<RestaurantResponse> getAllRestaurants();

    RestaurantResponse getRestaurantById(
            String restaurantId
    );

    RestaurantResponse updateRestaurant(
            String restaurantId,
            RestaurantRequest request
    );

    void deleteRestaurant(
            String restaurantId
    );
}