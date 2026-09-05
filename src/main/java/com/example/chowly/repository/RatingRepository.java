package com.example.chowly.repository;

import com.example.chowly.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository
        extends JpaRepository<Rating, String> {

    Optional<Rating> findByOrderOrderId(String orderId);

    List<Rating> findByCustomerCustomerId(String customerId);

    List<Rating> findByRestaurantRestaurantId(String restaurantId);

    List<Rating> findByRestaurantRestaurantIdAndRatingScore(
            String restaurantId,
            Integer ratingScore
    );

    boolean existsByOrderOrderId(String orderId);
}