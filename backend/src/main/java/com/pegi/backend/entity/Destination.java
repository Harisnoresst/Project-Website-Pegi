package com.pegi.backend.entity;

import com.pegi.backend.entity.enums.CrowdLevel;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "destinations")

public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nama;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double price;

    @Enumerated(EnumType.STRING)
    private CrowdLevel crowdLevel;

}
