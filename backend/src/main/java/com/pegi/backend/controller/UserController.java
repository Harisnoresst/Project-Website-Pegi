package com.pegi.backend.controller;

import com.pegi.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /api/profile
    // Mengembalikan data profil user yang sedang login + badge gamifikasi
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername(); // email dari JWT
        Map<String, Object> profile = userService.getProfile(email);
        return ResponseEntity.ok(profile);
    }

    // PUT /api/profile
    // Update data profil user yang sedang login
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> request) {

        // request bisa berisi: name, bio, phone, avatar, dsb
        String email = userDetails.getUsername();
        Map<String, Object> updated = userService.updateProfile(email, request);
        return ResponseEntity.ok(updated);
    }
}
