package com.pegi.backend.controller;

import com.pegi.backend.entity.Booking;
import com.pegi.backend.entity.Invoice;
import com.pegi.backend.services.BookingService;
import com.pegi.backend.services.PromoService;      
import com.pegi.backend.services.InvoiceService;    
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private PromoService promoService; 

    @Autowired
    private InvoiceService invoiceService; 

    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    
    @PostMapping
    @Transactional 
    public Booking createFullBooking(
            @RequestBody Booking bookingRequest, 
            @RequestParam(required = false) String promoCode) {

        
        if (promoCode != null && !promoCode.isEmpty()) {
            Double discountedPrice = promoService.applyDiscount(promoCode, bookingRequest.getTotalPrice());
            bookingRequest.setTotalPrice(discountedPrice);
        }

        
        Booking savedBooking = bookingService.createBooking(bookingRequest);

        
        invoiceService.createInvoice(savedBooking);

        
        return savedBooking;
    }
}