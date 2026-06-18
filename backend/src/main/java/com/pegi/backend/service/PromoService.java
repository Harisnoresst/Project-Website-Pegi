package com.pegi.backend.service;

import com.pegi.backend.entity.Promo;
import com.pegi.backend.repository.PromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromoService {
    
    @Autowired
    private PromoRepository promoRepository;

    
    public Promo createPromo(Promo promo) {
        
        if (promo.getIsActive() == null) {
            promo.setIsActive(true);
        }
        return promoRepository.save(promo);
    }

    
    public List<Promo> getAllPromos() {
        return promoRepository.findAll();
    }

    
    public Double applyDiscount(String code, Double originalPrice) {
        Promo promo = promoRepository.findByCode(code);
        if (promo != null && promo.getIsActive()) {
            return originalPrice - (originalPrice * promo.getDiscountPercent());
        }
        return originalPrice; 
    }

    
    public Promo validatePromo(String code) {
        return promoRepository.findByCode(code);
    }
}