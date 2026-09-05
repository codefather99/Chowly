package com.example.chowly.entity;

import com.example.chowly.enums.MenuType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {

    @Id
    @Column(name = "menu_id", nullable = false, updatable = false)
    private String menuId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(name = "menu_name", nullable = false)
    private String menuName;

    @Enumerated(EnumType.STRING)
    @Column(name = "menu_type", nullable = false)
    private MenuType menuType;
}