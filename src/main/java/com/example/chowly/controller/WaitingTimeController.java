package com.example.chowly.controller;

import com.example.chowly.dto.response.WaitingTimeResponse;
import com.example.chowly.service.WaitingTimeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/waiting-times")
public class WaitingTimeController {

    private final WaitingTimeService waitingTimeService;

    public WaitingTimeController(
            WaitingTimeService waitingTimeService
    ) {
        this.waitingTimeService = waitingTimeService;
    }

    @GetMapping("/order/{orderId}")
    public WaitingTimeResponse getByOrderId(
            @PathVariable String orderId
    ) {
        return waitingTimeService.getByOrderId(orderId);
    }
}