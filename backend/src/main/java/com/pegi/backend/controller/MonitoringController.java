package com.pegi.backend.controller;

import com.pegi.backend.dto.DashboardStats;
import com.pegi.backend.service.MonitoringService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring")
public class MonitoringController {

    @Autowired
    private MonitoringService monitoringService;
   
    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {
        return monitoringService.getDashboardStatistics();
    }
}