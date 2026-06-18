package com.pegi.backend.controller;

import com.pegi.backend.entity.Payment;
import com.pegi.backend.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment createPayment(@RequestBody Payment paymentRequest) {
        return paymentService.processPayment(paymentRequest);
    }
}
