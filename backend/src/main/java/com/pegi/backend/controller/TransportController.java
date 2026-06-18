package com.pegi.backend.controller;

import com.pegi.backend.entity.Transport;
import com.pegi.backend.service.TransportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transports")
public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping
    public List<Transport> getAllTransports() {
        return transportService.getAllTransports();
    }

    @PostMapping
    public Transport createTransport(@RequestBody Transport transport) {
        return transportService.createTransport(transport);
    }
}