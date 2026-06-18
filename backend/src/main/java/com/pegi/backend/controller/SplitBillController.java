package com.pegi.backend.controller;

import com.pegi.backend.entity.SplitBill;
import com.pegi.backend.service.SplitBillService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/groups")
public class SplitBillController {

    @Autowired
    private SplitBillService splitBillService;

    @PostMapping("/{id}/split-bill")
    public SplitBill createSplitBill(@PathVariable Long id, @RequestBody SplitBill request) {
        request.setGroupId(id);
        return splitBillService.createAndCalculateSplitBill(request);
    }

    @GetMapping ("/{id}/spit-bill")
    public ResponseEntity<SplitBill> getSplitBill(@PathVariable Long id) {
        return splitBillService.getSplitBillById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    
}
