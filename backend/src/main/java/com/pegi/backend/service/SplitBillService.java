package com.pegi.backend.service;

import com.pegi.backend.entity.BillMember;
import com.pegi.backend.entity.SplitBill;
import com.pegi.backend.entity.enums.BillStatus;
import com.pegi.backend.repository.SplitBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SplitBillService {

    @Autowired
    private SplitBillRepository splitBillRepository;

    public SplitBill createAndCalculateSplitBill(SplitBill request) {
        Double total = request.getTotalAmount();
        int totalMembers = request.getMembers().size();

        Double SplitAmount = 0.0;
        if (totalMembers > 0) {
            SplitAmount = total / totalMembers;
        }

        for (BillMember member : request.getMembers()) {
            member.setAmountToPay(SplitAmount);
            member.setStatus(BillStatus.BELUM_BAYAR);
            member.setSplitBill(request);
        }

        return splitBillRepository.save(request);
    }

    public Optional<SplitBill> getSplitBillById(Long id) {
        return splitBillRepository.findById(id);
    }
    
}
