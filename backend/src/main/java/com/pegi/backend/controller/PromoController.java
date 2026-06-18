package com.pegi.backend.controller;

import com.pegi.backend.entity.Promo;
import com.pegi.backend.service.PromoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/promos")
public class PromoController {

    @Autowired
    private PromoService promoService;

    @GetMapping
    public List<Promo> getAllPromos() {
        return promoService.getAllPromos();
    }

    @PostMapping
    public Promo createPromo(@RequestBody Promo promo) {
        return promoService.createPromo(promo);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validatePromo(@RequestBody Map<String, String> request) {
        
        String code = request.get("code");
        Promo promo = promoService.validatePromo(code);
        
        if (promo != null && promo.getIsActive()) {
            
            return ResponseEntity.ok(promo);
        } else {
            
            return ResponseEntity.badRequest().body("Kode promo tidak valid atau sudah tidak aktif");
        }
    }
}