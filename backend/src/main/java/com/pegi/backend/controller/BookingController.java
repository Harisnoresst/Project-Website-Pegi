package com.pegi.backend.controller;

import com.pegi.backend.entity.Booking;
import com.pegi.backend.entity.Invoice;
import com.pegi.backend.entity.Ticket;
import com.pegi.backend.service.BookingService;
import com.pegi.backend.service.InvoiceService;
import com.pegi.backend.service.PromoService;
import com.pegi.backend.service.TicketService;

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

    @Autowired
    private TicketService ticketService;
    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{bookingId}/tickets")
    public List<Ticket> getTicketsForBooking(@PathVariable Long bookingId) {
        return ticketService.getTicketsByBooking(bookingId);
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