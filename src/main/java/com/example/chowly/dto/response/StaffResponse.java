package com.example.chowly.dto.response;

import com.example.chowly.enums.StaffRole;

public record StaffResponse(

        String staffId,
        String staffName,
        StaffRole staffRole,
        String restaurantId,
        String staffNumber

) {
}