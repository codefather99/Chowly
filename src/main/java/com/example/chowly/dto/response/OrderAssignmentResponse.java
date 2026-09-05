package com.example.chowly.dto.response;

import java.time.LocalDateTime;

public record OrderAssignmentResponse(
        String assignmentId,
        String orderId,
        String staffId,
        String staffName,
        LocalDateTime assignedAt
) {
}