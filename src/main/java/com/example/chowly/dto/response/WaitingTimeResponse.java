package com.example.chowly.dto.response;

public record WaitingTimeResponse(

        String waitingTimeId,
        Integer estimatedWaitingTime

) {
}