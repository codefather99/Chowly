package com.example.chowly.service.impl;

import com.example.chowly.dto.request.RestaurantRequest;
import com.example.chowly.dto.response.RestaurantResponse;
import com.example.chowly.entity.Restaurant;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.RestaurantRepository;
import com.example.chowly.service.RestaurantService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl
        implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantServiceImpl(
            RestaurantRepository restaurantRepository
    ) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public RestaurantResponse createRestaurant(
            RestaurantRequest request
    ) {

        Restaurant restaurant = Restaurant.builder()
                .restaurantId(request.restaurantId())
                .restaurantName(request.restaurantName())
                .location(request.location())
                .build();

        Restaurant savedRestaurant =
                restaurantRepository.save(restaurant);

        return mapToResponse(savedRestaurant);
    }

    @Override
    public List<RestaurantResponse> getAllRestaurants() {

        return restaurantRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public RestaurantResponse getRestaurantById(
            String restaurantId
    ) {

        Restaurant restaurant =
                restaurantRepository.findById(restaurantId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + restaurantId
                                )
                        );

        return mapToResponse(restaurant);
    }

    @Override
    public RestaurantResponse updateRestaurant(
            String restaurantId,
            RestaurantRequest request
    ) {

        Restaurant restaurant =
                restaurantRepository.findById(restaurantId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + restaurantId
                                )
                        );

        restaurant.setRestaurantName(
                request.restaurantName()
        );

        restaurant.setLocation(
                request.location()
        );

        Restaurant updatedRestaurant =
                restaurantRepository.save(restaurant);

        return mapToResponse(updatedRestaurant);
    }

    @Override
    public void deleteRestaurant(
            String restaurantId
    ) {

        Restaurant restaurant =
                restaurantRepository.findById(restaurantId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + restaurantId
                                )
                        );

        restaurantRepository.delete(restaurant);
    }

    private RestaurantResponse mapToResponse(
            Restaurant restaurant
    ) {

        return new RestaurantResponse(
                restaurant.getRestaurantId(),
                restaurant.getRestaurantName(),
                restaurant.getLocation()
        );
    }
}