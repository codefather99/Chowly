package com.example.chowly.service.impl;

import com.example.chowly.dto.response.WaitingTimeResponse;
import com.example.chowly.entity.WaitingTime;
import com.example.chowly.exception.ResourceNotFoundException;
import com.example.chowly.repository.WaitingTimeRepository;
import com.example.chowly.service.WaitingTimeService;
import org.springframework.stereotype.Service;

@Service
public class WaitingTimeServiceImpl implements WaitingTimeService {

    private final WaitingTimeRepository waitingTimeRepository;

    public WaitingTimeServiceImpl(
            WaitingTimeRepository waitingTimeRepository
    ) {
        this.waitingTimeRepository = waitingTimeRepository;
    }

    @Override
    public WaitingTimeResponse getByOrderId(String orderId) {

        WaitingTime waitingTime =
                waitingTimeRepository
                        .findByOrderOrderId(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Waiting time not found for order: "
                                                + orderId
                                )
                        );

        return new WaitingTimeResponse(
                waitingTime.getWaitingTimeId(),
                waitingTime.getEstimatedTime()
        );
    }
}