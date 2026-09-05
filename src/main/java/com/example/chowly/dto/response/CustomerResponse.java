package com.example.chowly.dto.response;

public record CustomerResponse(

        String customerId,
        String firstName,
        String lastName,
        String phoneNumber

) {
}