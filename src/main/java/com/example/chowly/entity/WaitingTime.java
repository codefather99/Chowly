package com.example.chowly.entity;

import com.example.chowly.enums.WaitingStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "waiting_times")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaitingTime {

    @Id
    @Column(name = "waiting_time_id", nullable = false, updatable = false)
    private String waitingTimeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "order_id",
            nullable = false,
            unique = true
    )
    private Order order;

    @Column(name = "estimated_time", nullable = false)
    private Integer estimatedTime;

    @Column(name = "actual_time")
    private Integer actualTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "waiting_status", nullable = false)
    private WaitingStatus waitingStatus;
}