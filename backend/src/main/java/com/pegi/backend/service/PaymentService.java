package com.pegi.backend.service;

import com.pegi.backend.entity.Payment;
import com.pegi.backend.entity.Booking;
import com.pegi.backend.entity.Ticket;
import com.pegi.backend.entity.enums.BookingStatus;
import com.pegi.backend.entity.enums.PaymentStatus;
import com.pegi.backend.repository.BookingRepository;
import com.pegi.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TicketService ticketService;

    public Payment processPayment(Payment paymentRequest) {
        
        paymentRequest.setPaymentDate(LocalDateTime.now());
        paymentRequest.setStatus(PaymentStatus.PAID);
        Payment savedPayment = paymentRepository.save(paymentRequest);

        if (savedPayment.getBooking() != null) {
            long bookingId = savedPayment.getBooking().getId();
            Booking relatedBooking = bookingRepository.findById(bookingId).orElse(null);

            // if (relatedBooking != null) {
                
            //     relatedBooking.setStatus(BookingStatus.CONFIRMED);
            //     bookingRepository.save(relatedBooking);                
            //     if (relatedBooking.getUser() != null) {                                        
            //         String targetEmail = relatedBooking.getUser().getEmail();                                                           
            //         String passengerName = relatedBooking.getUser().getName();     
            //         Ticket generatedTicket = ticketService.generateTicket(relatedBooking, passengerName);         
            //         try {
            //             emailService.sendBookingConfirmation(
            //                     targetEmail, 
            //                     generatedTicket.getPassengerName(), 
            //                     generatedTicket.getTicketCode()
            //             );
            //             System.out.println("Sukses: Email tiket terkirim ke " + targetEmail);
            //         } catch (Exception e) {
            //             System.err.println("Peringatan: Gagal ngirim email tiket ke " + targetEmail + ". Alasan: " + e.getMessage());
            //         }
                    
            //     } else {
                    
            //         ticketService.generateTicket(relatedBooking, "Guest");
            //         System.err.println("Info: Tidak ada data User di Booking ini, email dilewati.");
            //     }
            // }
        }

        return savedPayment;
    }
}