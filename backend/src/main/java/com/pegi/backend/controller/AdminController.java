package com.pegi.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Jangan lupa pasang CORS dan izinkan Credentials biar nyambung sama Frontend
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    // INI DIA ALAMAT YANG DICARI SAMA FRONT-END LU
    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments() {
        // Nanti bagian ini lu ganti sama kodingan buat manggil database asli
        // Misalnya: List<Payment> payments = paymentService.getAll();
        
        // Buat ngetes supaya 404-nya hilang dan tabel di Frontend lu muncul, 
        // kita kirim data "dummy" (bohongan) dulu:
        List<Map<String, Object>> dummyData = List.of(
                Map.of("id", 1, "userName", "Rahman", "amount", 500000, "status", "PAID"),
                Map.of("id", 2, "userName", "Naufal", "amount", 750000, "status", "PENDING")
        );

        return ResponseEntity.ok(dummyData);
    }
}