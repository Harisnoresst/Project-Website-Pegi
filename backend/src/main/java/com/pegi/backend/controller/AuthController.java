package com.pegi.backend.controller;

import com.pegi.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        // request berisi: name, email, password
        Map<String, Object> response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        // request berisi: email, password
        // response akan berisi JWT token
        Map<String, Object> response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // POST /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT bersifat stateless, logout cukup hapus token di sisi client
        // Tapi kita tetap beri respons sukses
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Logout berhasil"
        ));
    }
}
