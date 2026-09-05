package com.example.chowly.entity;

import com.example.chowly.enums.StaffRole;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @Column(name = "staff_id", nullable = false, updatable = false)
    private String staffId;

    @Column(name = "staff_name", nullable = false)
    private String staffName;

    @Enumerated(EnumType.STRING)
    @Column(name = "staff_role", nullable = false)
    private StaffRole staffRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(name = "staff_number", nullable = false, unique = true)
    private String staffNumber;
}