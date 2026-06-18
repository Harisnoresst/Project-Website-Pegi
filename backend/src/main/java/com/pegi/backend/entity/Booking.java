package com.pegi.backend.entity;

import com.pegi.backend.entity.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

@Entity
@Data
@Table(name= "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @ManyToOne
    // @JoinColumn(name = "user_id")
    // private User user;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    private LocalDateTime bookingDate;
    private Integer totalGuests;
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    
}
