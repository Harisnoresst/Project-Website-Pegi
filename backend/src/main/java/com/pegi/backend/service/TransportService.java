package com.pegi.backend.service;

import com.pegi.backend.entity.Transport;
import com.pegi.backend.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportService {
    @Autowired
    private TransportRepository transportRepository;

    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    public Transport createTransport(Transport transport) {
        return transportRepository.save(transport);
    }
}