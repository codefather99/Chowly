package com.example.chowly.service;

import com.example.chowly.dto.request.CreateRatingRequest;
import com.example.chowly.dto.request.UpdateRatingRequest;
import com.example.chowly.dto.response.RatingResponse;

import java.util.List;

public interface RatingService {

    RatingResponse createRating(
            CreateRatingRequest request
    );

    RatingResponse getRatingById(
            String ratingId
    );

    RatingResponse getRatingByOrderId(
            String orderId
    );

    List<RatingResponse> getRatingsByCustomer(
            String customerId
    );

    List<RatingResponse> getRatingsByRestaurant(
            String restaurantId
    );

    List<RatingResponse> getFiveStarRatings(
            String restaurantId
    );

    RatingResponse updateRating(
            String ratingId,
            UpdateRatingRequest request
    );

    void deleteRating(String ratingId);
}