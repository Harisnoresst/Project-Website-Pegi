package com.pegi.backend.controller;

import com.pegi.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        Map<String, Object> response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // POST /api/auth/login
    // TAHAP 1: validasi email+password, lalu kirim OTP ke email
    // Response BELUM berisi token JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // POST /api/auth/verify-otp
    // TAHAP 2: user input kode OTP dari email, baru dapat token JWT
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        // request berisi: email, otpCode
        Map<String, Object> response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    // POST /api/auth/resend-otp
    // Kirim ulang kode OTP baru kalau yang lama expired/tidak diterima
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> request) {
        // request berisi: email
        Map<String, Object> response = authService.resendOtp(request);
        return ResponseEntity.ok(response);
    }

   
    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> request) {
        try {
            Map<String, Object> response = authService.requestOtp(request);
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            if (e.getMessage() != null && e.getMessage().contains("sudah terdaftar")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                        "status", "error",
                        "message", e.getMessage()
                ));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Gagal server: " + e.getMessage()
            ));
        }
    }

    // POST /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Logout berhasil"
        ));
    }
}
