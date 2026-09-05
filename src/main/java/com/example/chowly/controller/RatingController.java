package com.example.chowly.controller;

import com.example.chowly.dto.request.CreateRatingRequest;
import com.example.chowly.dto.request.UpdateRatingRequest;
import com.example.chowly.dto.response.RatingResponse;
import com.example.chowly.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingResponse> createRating(
            @Valid @RequestBody CreateRatingRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ratingService.createRating(request)
                );
    }

    @GetMapping("/{ratingId}")
    public ResponseEntity<RatingResponse> getRatingById(
            @PathVariable String ratingId
    ) {

        return ResponseEntity.ok(
                ratingService.getRatingById(ratingId)
        );
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<RatingResponse> getRatingByOrderId(
            @PathVariable String orderId
    ) {

        return ResponseEntity.ok(
                ratingService.getRatingByOrderId(orderId)
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<RatingResponse>>
    getRatingsByCustomer(
            @PathVariable String customerId
    ) {

        return ResponseEntity.ok(
                ratingService
                        .getRatingsByCustomer(customerId)
        );
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<RatingResponse>>
    getRatingsByRestaurant(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                ratingService
                        .getRatingsByRestaurant(restaurantId)
        );
    }

    @GetMapping("/restaurant/{restaurantId}/five-star")
    public ResponseEntity<List<RatingResponse>>
    getFiveStarRatings(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                ratingService
                        .getFiveStarRatings(restaurantId)
        );
    }

    @PutMapping("/{ratingId}")
    public ResponseEntity<RatingResponse> updateRating(
            @PathVariable String ratingId,
            @Valid @RequestBody UpdateRatingRequest request
    ) {

        return ResponseEntity.ok(
                ratingService.updateRating(
                        ratingId,
                        request
                )
        );
    }

    @DeleteMapping("/{ratingId}")
    public ResponseEntity<Void> deleteRating(
            @PathVariable String ratingId
    ) {

        ratingService.deleteRating(ratingId);

        return ResponseEntity.noContent().build();
    }
}