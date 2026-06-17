package com.pegi.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pegi.backend.entity.Invoice;
import com.pegi.backend.repository.InvoiceRepository;
import com.pegi.backend.entity.Booking;
import java.time.LocalDateTime;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice createInvoice(Booking booking) {
        Invoice invoice = new Invoice();
        invoice.setBooking(booking);
        invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        invoice.setGeneratedDate(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }
}