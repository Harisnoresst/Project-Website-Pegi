package com.pegi.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pegi.backend.entity.Promo;
import com.pegi.backend.repository.PromoRepository;

@Service
public class PromoService {
    
    @Autowired
    private PromoRepository promoRepository;

    public Double applyDiscount (String code, Double originalPrice) {
        Promo promo = promoRepository.findByCode(code);
        if (promo != null && promo.getIsActive()) {
            return originalPrice - (originalPrice * promo.getDiscountPercent());
        }
        return originalPrice;
    }


}
