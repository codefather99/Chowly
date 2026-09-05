package com.example.chowly.service.impl;

import com.example.chowly.dto.request.CreateRatingRequest;
import com.example.chowly.dto.request.UpdateRatingRequest;
import com.example.chowly.dto.response.RatingResponse;
import com.example.chowly.entity.Customer;
import com.example.chowly.entity.Order;
import com.example.chowly.entity.Rating;
import com.example.chowly.entity.Restaurant;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.CustomerRepository;
import com.example.chowly.repository.OrderRepository;
import com.example.chowly.repository.RatingRepository;
import com.example.chowly.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public RatingResponse createRating(
            CreateRatingRequest request
    ) {

        Customer customer =
                customerRepository.findById(request.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with ID: "
                                                + request.customerId()
                                )
                        );

        Order order =
                orderRepository.findById(request.orderId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with ID: "
                                                + request.orderId()
                                )
                        );

        /*
         * Make sure the customer actually owns
         * the order being rated.
         */
        if (!order.getCustomer()
                .getCustomerId()
                .equals(customer.getCustomerId())) {

            throw new IllegalArgumentException(
                    "Customer does not belong to this order"
            );
        }

        /*
         * Prevent multiple ratings for the same order.
         */
        if (ratingRepository
                .existsByOrderOrderId(request.orderId())) {

            throw new IllegalArgumentException(
                    "This order has already been rated"
            );
        }

        Restaurant restaurant = order.getRestaurant();

        LocalDateTime now = LocalDateTime.now();

        Rating rating = Rating.builder()
                .ratingId(generateRatingId())
                .customer(customer)
                .restaurant(restaurant)
                .order(order)
                .ratingScore(request.ratingScore())
                .reviewText(request.reviewText())
                .createdAt(now)
                .updatedAt(now)
                .build();

        Rating savedRating =
                ratingRepository.save(rating);

        return mapToResponse(savedRating);
    }

    @Override
    public RatingResponse getRatingById(
            String ratingId
    ) {

        Rating rating =
                ratingRepository.findById(ratingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Rating not found with ID: "
                                                + ratingId
                                )
                        );

        return mapToResponse(rating);
    }

    @Override
    public RatingResponse getRatingByOrderId(
            String orderId
    ) {

        Rating rating =
                ratingRepository
                        .findByOrderOrderId(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Rating not found for order: "
                                                + orderId
                                )
                        );

        return mapToResponse(rating);
    }

    @Override
    public List<RatingResponse> getRatingsByCustomer(
            String customerId
    ) {

        return ratingRepository
                .findByCustomerCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<RatingResponse> getRatingsByRestaurant(
            String restaurantId
    ) {

        return ratingRepository
                .findByRestaurantRestaurantId(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<RatingResponse> getFiveStarRatings(
            String restaurantId
    ) {

        return ratingRepository
                .findByRestaurantRestaurantIdAndRatingScore(
                        restaurantId,
                        5
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public RatingResponse updateRating(
            String ratingId,
            UpdateRatingRequest request
    ) {

        Rating rating =
                ratingRepository.findById(ratingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Rating not found with ID: "
                                                + ratingId
                                )
                        );

        if (request.ratingScore() != null) {
            rating.setRatingScore(
                    request.ratingScore()
            );
        }

        if (request.reviewText() != null) {
            rating.setReviewText(
                    request.reviewText()
            );
        }

        rating.setUpdatedAt(
                LocalDateTime.now()
        );

        Rating updatedRating =
                ratingRepository.save(rating);

        return mapToResponse(updatedRating);
    }

    @Override
    @Transactional
    public void deleteRating(
            String ratingId
    ) {

        Rating rating =
                ratingRepository.findById(ratingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Rating not found with ID: "
                                                + ratingId
                                )
                        );

        ratingRepository.delete(rating);
    }

    private RatingResponse mapToResponse(
            Rating rating
    ) {

        Customer customer = rating.getCustomer();
        Restaurant restaurant = rating.getRestaurant();

        String customerName =
                customer.getFirstName()
                        + " "
                        + customer.getLastName();

        return new RatingResponse(
                rating.getRatingId(),
                customer.getCustomerId(),
                customerName,
                restaurant.getRestaurantId(),
                restaurant.getRestaurantName(),
                rating.getOrder().getOrderId(),
                rating.getRatingScore(),
                rating.getReviewText(),
                rating.getCreatedAt(),
                rating.getUpdatedAt()
        );
    }

    private String generateRatingId() {
        return "RAT-" + UUID.randomUUID();
    }
}