package com.pegi.backend.service;

import com.pegi.backend.entity.Booking;
import com.pegi.backend.entity.enums.BookingStatus;
import com.pegi.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    } 

    public Booking createBooking(Booking bookingRequest) {
        bookingRequest.setBookingDate(LocalDateTime.now());
        bookingRequest.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(bookingRequest);
        
    }
    
}
