package com.pegi.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name= "promos")
public class Promo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private Double discountPercent;
    private Boolean isActive;
    
}
