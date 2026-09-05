package com.example.chowly.controller;

import com.example.chowly.dto.request.CreateOrderRequest;
import com.example.chowly.dto.request.OrderStatusRequest;

import com.example.chowly.dto.response.OrderResponse;

import com.example.chowly.enums.OrderStatus;

import com.example.chowly.service.OrderService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }

    /*
     * Create a complete order.
     */

    @PostMapping
    public ResponseEntity<OrderResponse>
    createOrder(
            @Valid
            @RequestBody
            CreateOrderRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        orderService.createOrder(request)
                );
    }

    /*
     * Get all orders.
     */

    @GetMapping
    public ResponseEntity<List<OrderResponse>>
    getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    /*
     * Get one order.
     */

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse>
    getOrderById(
            @PathVariable String orderId
    ) {

        return ResponseEntity.ok(
                orderService.getOrderById(orderId)
        );
    }

    /*
     * Get customer orders.
     */

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderResponse>>
    getOrdersByCustomer(
            @PathVariable String customerId
    ) {

        return ResponseEntity.ok(
                orderService.getOrdersByCustomer(
                        customerId
                )
        );
    }

    /*
     * Get restaurant orders.
     */

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<OrderResponse>>
    getOrdersByRestaurant(
            @PathVariable String restaurantId
    ) {

        return ResponseEntity.ok(
                orderService.getOrdersByRestaurant(
                        restaurantId
                )
        );
    }

    /*
     * Get orders by status.
     */

    @GetMapping("/status/{orderStatus}")
    public ResponseEntity<List<OrderResponse>>
    getOrdersByStatus(
            @PathVariable OrderStatus orderStatus
    ) {

        return ResponseEntity.ok(
                orderService.getOrdersByStatus(
                        orderStatus
                )
        );
    }

    /*
     * Update order status.
     */

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse>
    updateOrderStatus(
            @PathVariable String orderId,

            @Valid
            @RequestBody
            OrderStatusRequest request
    ) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        orderId,
                        request.orderStatus()
                )
        );
    }

    /*
     * Cancel order.
     */

    @PatchMapping("/{orderId}/cancel")
    public ResponseEntity<Void>
    cancelOrder(
            @PathVariable String orderId
    ) {

        orderService.cancelOrder(orderId);

        return ResponseEntity
                .noContent()
                .build();
    }
}