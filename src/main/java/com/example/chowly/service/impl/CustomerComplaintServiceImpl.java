package com.example.chowly.service.impl;

import com.example.chowly.dto.request.CreateComplaintRequest;
import com.example.chowly.dto.request.UpdateComplaintStatusRequest;
import com.example.chowly.dto.response.CustomerComplaintResponse;
import com.example.chowly.entity.Customer;
import com.example.chowly.entity.CustomerComplaint;
import com.example.chowly.entity.Order;
import com.example.chowly.entity.Restaurant;
import com.example.chowly.enums.ComplaintStatus;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.CustomerComplaintRepository;
import com.example.chowly.repository.CustomerRepository;
import com.example.chowly.repository.OrderRepository;
import com.example.chowly.repository.RestaurantRepository;
import com.example.chowly.service.CustomerComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerComplaintServiceImpl
        implements CustomerComplaintService {

    private final CustomerComplaintRepository complaintRepository;
    private final CustomerRepository customerRepository;
    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public CustomerComplaintResponse createComplaint(
            CreateComplaintRequest request
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
         * Make sure the customer submitting the complaint
         * actually owns the order.
         */
        if (!order.getCustomer()
                .getCustomerId()
                .equals(customer.getCustomerId())) {

            throw new IllegalArgumentException(
                    "Customer does not belong to this order"
            );
        }

        Restaurant restaurant = order.getRestaurant();

        /*
         * One complaint per order.
         */
        if (complaintRepository
                .existsByOrderOrderId(request.orderId())) {

            throw new IllegalArgumentException(
                    "A complaint already exists for order: "
                            + request.orderId()
            );
        }

        LocalDateTime now = LocalDateTime.now();

        CustomerComplaint complaint =
                CustomerComplaint.builder()
                        .complaintId(generateComplaintId())
                        .customer(customer)
                        .restaurant(restaurant)
                        .order(order)
                        .complaintText(request.complaintText())
                        .complaintStatus(ComplaintStatus.OPEN)
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

        CustomerComplaint savedComplaint =
                complaintRepository.save(complaint);

        return mapToResponse(savedComplaint);
    }

    @Override
    public CustomerComplaintResponse getComplaintById(
            String complaintId
    ) {

        CustomerComplaint complaint =
                complaintRepository.findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found with ID: "
                                                + complaintId
                                )
                        );

        return mapToResponse(complaint);
    }

    @Override
    public List<CustomerComplaintResponse> getComplaintsByCustomer(
            String customerId
    ) {

        return complaintRepository
                .findByCustomerCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CustomerComplaintResponse> getComplaintsByRestaurant(
            String restaurantId
    ) {

        return complaintRepository
                .findByRestaurantRestaurantId(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CustomerComplaintResponse> getComplaintsByStatus(
            ComplaintStatus complaintStatus
    ) {

        return complaintRepository
                .findByComplaintStatus(complaintStatus)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public CustomerComplaintResponse updateComplaintStatus(
            String complaintId,
            UpdateComplaintStatusRequest request
    ) {

        CustomerComplaint complaint =
                complaintRepository.findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found with ID: "
                                                + complaintId
                                )
                        );

        ComplaintStatus currentStatus =
                complaint.getComplaintStatus();

        ComplaintStatus newStatus =
                request.complaintStatus();

        validateStatusTransition(
                currentStatus,
                newStatus
        );

        complaint.setComplaintStatus(newStatus);
        complaint.setUpdatedAt(LocalDateTime.now());

        if (newStatus == ComplaintStatus.RESOLVED) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        CustomerComplaint savedComplaint =
                complaintRepository.save(complaint);

        return mapToResponse(savedComplaint);
    }

    private void validateStatusTransition(
            ComplaintStatus currentStatus,
            ComplaintStatus newStatus
    ) {

        if (currentStatus == ComplaintStatus.CLOSED) {

            throw new IllegalArgumentException(
                    "A closed complaint cannot be updated"
            );
        }

        if (currentStatus == ComplaintStatus.OPEN
                && newStatus == ComplaintStatus.RESOLVED) {

            throw new IllegalArgumentException(
                    "Complaint must be marked IN_PROGRESS before RESOLVED"
            );
        }

        if (currentStatus == ComplaintStatus.OPEN
                && newStatus == ComplaintStatus.CLOSED) {

            throw new IllegalArgumentException(
                    "Complaint must be resolved before it can be closed"
            );
        }

        if (currentStatus == ComplaintStatus.IN_PROGRESS
                && newStatus == ComplaintStatus.CLOSED) {

            throw new IllegalArgumentException(
                    "Complaint must be RESOLVED before it can be CLOSED"
            );
        }
    }

    private CustomerComplaintResponse mapToResponse(
            CustomerComplaint complaint
    ) {

        Customer customer = complaint.getCustomer();
        Restaurant restaurant = complaint.getRestaurant();

        String customerName =
                customer.getFirstName()
                        + " "
                        + customer.getLastName();

        return new CustomerComplaintResponse(
                complaint.getComplaintId(),
                customer.getCustomerId(),
                customerName,
                restaurant.getRestaurantId(),
                restaurant.getRestaurantName(),
                complaint.getOrder().getOrderId(),
                complaint.getComplaintText(),
                complaint.getComplaintStatus(),
                complaint.getCreatedAt(),
                complaint.getUpdatedAt(),
                complaint.getResolvedAt()
        );
    }

    private String generateComplaintId() {
        return "CMP-" + UUID.randomUUID();
    }
}