package com.example.chowly.service;

import com.example.chowly.dto.response.WaitingTimeResponse;

public interface WaitingTimeService {

    WaitingTimeResponse getByOrderId(String orderId);
}