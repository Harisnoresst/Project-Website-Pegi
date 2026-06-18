package com.pegi.backend.controller;

import com.pegi.backend.entity.Destination;
import com.pegi.backend.service.CrowdCalculationService;
import com.pegi.backend.service.DestinationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @Autowired
    private CrowdCalculationService crowdCalculationService; 

    @GetMapping
    public List<Destination> getAllDestinations() {        
        crowdCalculationService.calculateAndUpdateCrowdLevels();          
        return destinationService.getAllDestinations();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {   
        crowdCalculationService.calculateAndUpdateCrowdLevels();        
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}