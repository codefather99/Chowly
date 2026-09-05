package com.example.chowly.dto.request;

import com.example.chowly.enums.ComplaintStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateComplaintStatusRequest(

        @NotNull(message = "Complaint status is required")
        ComplaintStatus complaintStatus
) {
}