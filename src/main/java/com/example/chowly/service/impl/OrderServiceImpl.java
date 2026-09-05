package com.example.chowly.service.impl;

import com.example.chowly.dto.request.CreateOrderRequest;
import com.example.chowly.dto.request.OrderItemRequest;

import com.example.chowly.dto.response.OrderItemResponse;
import com.example.chowly.dto.response.OrderResponse;
import com.example.chowly.dto.response.WaitingTimeResponse;

import com.example.chowly.entity.Customer;
import com.example.chowly.entity.MenuItem;
import com.example.chowly.entity.Order;
import com.example.chowly.entity.OrderItem;
import com.example.chowly.entity.Restaurant;
import com.example.chowly.entity.WaitingTime;

import com.example.chowly.enums.OrderStatus;

import com.example.chowly.enums.WaitingStatus;
import com.example.chowly.exception.ResourceNotFoundException;

import com.example.chowly.repository.CustomerRepository;
import com.example.chowly.repository.MenuItemRepository;
import com.example.chowly.repository.OrderItemRepository;
import com.example.chowly.repository.OrderRepository;
import com.example.chowly.repository.RestaurantRepository;
import com.example.chowly.repository.WaitingTimeRepository;

import com.example.chowly.service.OrderService;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final WaitingTimeRepository waitingTimeRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CustomerRepository customerRepository,
            RestaurantRepository restaurantRepository,
            MenuItemRepository menuItemRepository,
            WaitingTimeRepository waitingTimeRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
        this.waitingTimeRepository = waitingTimeRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(
            CreateOrderRequest request
    ) {

        /*
         * STEP 1
         * Find the customer.
         */

        Customer customer =
                customerRepository
                        .findById(request.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with ID: "
                                                + request.customerId()
                                )
                        );

        /*
         * STEP 2
         * Find the restaurant.
         */

        Restaurant restaurant =
                restaurantRepository
                        .findById(request.restaurantId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Restaurant not found with ID: "
                                                + request.restaurantId()
                                )
                        );

        /*
         * STEP 3
         * Create the order first.
         */

        Order order = Order.builder()
                .orderId(generateOrderId())
                .customer(customer)
                .restaurant(restaurant)
                .orderDate(LocalDateTime.now())
                .orderStatus(OrderStatus.PREPARING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        Order savedOrder =
                orderRepository.save(order);

        /*
         * STEP 4
         * Create all OrderItems.
         */

        List<OrderItem> savedOrderItems =
                new ArrayList<>();

        BigDecimal totalAmount =
                BigDecimal.ZERO;

        for (OrderItemRequest itemRequest
                : request.items()) {

            MenuItem menuItem =
                    menuItemRepository
                            .findById(
                                    itemRequest.menuItemId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Menu item not found with ID: "
                                                    + itemRequest.menuItemId()
                                    )
                            );

            /*
             * SECURITY / BUSINESS VALIDATION
             *
             * Ensure the menu item belongs
             * to the selected restaurant.
             */

            String menuItemRestaurantId =
                    menuItem
                            .getMenu()
                            .getRestaurant()
                            .getRestaurantId();

            if (!menuItemRestaurantId.equals(
                    restaurant.getRestaurantId()
            )) {

                throw new IllegalArgumentException(
                        "Menu item "
                                + menuItem.getMenuItemId()
                                + " does not belong to restaurant "
                                + restaurant.getRestaurantId()
                );
            }

            /*
             * Get price from database.
             */

            BigDecimal unitPrice =
                    menuItem.getPrice();

            BigDecimal subtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(
                                    itemRequest.quantity()
                            )
                    );

            OrderItem orderItem =
                    OrderItem.builder()
                            .orderItemId(
                                    generateOrderItemId()
                            )
                            .order(savedOrder)
                            .menuItem(menuItem)
                            .quantity(
                                    itemRequest.quantity()
                            )
                            .unitPrice(unitPrice)
                            .subtotal(subtotal)
                            .build();

            OrderItem savedOrderItem =
                    orderItemRepository.save(orderItem);

            savedOrderItems.add(savedOrderItem);

            totalAmount =
                    totalAmount.add(subtotal);
        }

        /*
         * STEP 5
         * Update the total order amount.
         */

        savedOrder.setTotalAmount(
                totalAmount
        );

        savedOrder =
                orderRepository.save(savedOrder);

        /*
         * STEP 6
         * Create Waiting Time automatically.
         */

        WaitingTime waitingTime =
                WaitingTime.builder()
                        .waitingTimeId(
                                generateWaitingTimeId()
                        )
                        .order(savedOrder)
                        .estimatedTime(
                                calculateWaitingTime(
                                        savedOrderItems
                                )
                        )
                        .waitingStatus(
                                WaitingStatus.PENDING
                        )
                        .build();

        WaitingTime savedWaitingTime =
                waitingTimeRepository.save(
                        waitingTime
                );

        /*
         * STEP 7
         * Return the complete order.
         */

        return mapToResponse(
                savedOrder,
                savedOrderItems,
                savedWaitingTime
        );
    }

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(this::getFullOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(
            String orderId
    ) {

        Order order =
                findOrder(orderId);

        return getFullOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getOrdersByCustomer(
            String customerId
    ) {

        return orderRepository
                .findByCustomerCustomerId(customerId)
                .stream()
                .map(this::getFullOrderResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getOrdersByRestaurant(
            String restaurantId
    ) {

        return orderRepository
                .findByRestaurantRestaurantId(
                        restaurantId
                )
                .stream()
                .map(this::getFullOrderResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(
            OrderStatus orderStatus
    ) {

        return orderRepository
                .findByOrderStatus(orderStatus)
                .stream()
                .map(this::getFullOrderResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(
            String orderId,
            OrderStatus orderStatus
    ) {

        Order order =
                findOrder(orderId);

        order.setOrderStatus(orderStatus);

        Order updatedOrder =
                orderRepository.save(order);

        return getFullOrderResponse(
                updatedOrder
        );
    }

    @Override
    @Transactional
    public void cancelOrder(
            String orderId
    ) {

        Order order =
                findOrder(orderId);

        order.setOrderStatus(
                OrderStatus.CANCELLED
        );

        orderRepository.save(order);
    }

    /*
     * =========================
     * HELPER METHODS
     * =========================
     */

    private Order findOrder(
            String orderId
    ) {

        return orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: "
                                        + orderId
                        )
                );
    }

    private OrderResponse getFullOrderResponse(
            Order order
    ) {

        List<OrderItem> orderItems =
                orderItemRepository
                        .findByOrderOrderId(
                                order.getOrderId()
                        );

        WaitingTime waitingTime =
                waitingTimeRepository
                        .findByOrderOrderId(
                                order.getOrderId()
                        )
                        .orElse(null);

        return mapToResponse(
                order,
                orderItems,
                waitingTime
        );
    }

    private OrderResponse mapToResponse(
            Order order,
            List<OrderItem> orderItems,
            WaitingTime waitingTime
    ) {

        List<OrderItemResponse> itemResponses =
                orderItems.stream()
                        .map(item ->
                                new OrderItemResponse(
                                        item.getOrderItemId(),
                                        item.getMenuItem()
                                                .getMenuItemId(),
                                        item.getMenuItem()
                                                .getItemName(),
                                        item.getQuantity(),
                                        item.getUnitPrice(),
                                        item.getSubtotal()
                                )
                        )
                        .toList();

        WaitingTimeResponse waitingTimeResponse =
                waitingTime != null
                        ? new WaitingTimeResponse(
                        waitingTime
                                .getWaitingTimeId(),
                        waitingTime
                                .getEstimatedTime()
                )
                        : null;

        return new OrderResponse(
                order.getOrderId(),
                order.getCustomer()
                        .getCustomerId(),
                order.getRestaurant()
                        .getRestaurantId(),
                order.getOrderDate(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                itemResponses,
                waitingTimeResponse
        );
    }

    /*
     * Simple ID generation.
     *
     * We can improve this later using UUIDs.
     */

    private String generateOrderId() {

        return "ORD-" +
                System.currentTimeMillis();
    }

    private String generateOrderItemId() {

        return "OI-" +
                System.nanoTime();
    }

    private String generateWaitingTimeId() {

        return "WT-" +
                System.currentTimeMillis();
    }

    /*
     * Initial waiting-time calculation.
     */

    private Integer calculateWaitingTime(
            List<OrderItem> orderItems
    ) {

        int totalQuantity =
                orderItems.stream()
                        .mapToInt(
                                OrderItem::getQuantity
                        )
                        .sum();

        /*
         * Base preparation time = 10 minutes.
         * Add 5 minutes per item.
         */

        return 10 + (totalQuantity * 5);
    }
}