package com.pegi.backend.service;

import com.pegi.backend.dto.DashboardStats;
import com.pegi.backend.entity.enums.PaymentStatus;
import com.pegi.backend.repository.BookingRepository;
import com.pegi.backend.repository.DestinationRepository;
import com.pegi.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonitoringService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public DashboardStats getDashboardStatistics() {
        DashboardStats stats = new DashboardStats();

        long totalBookings = bookingRepository.count();
        stats.setTotalBookings(totalBookings);

        long totalDestinations = destinationRepository.count();
        stats.setTotalDestinations(totalDestinations);

        Double revenue = paymentRepository.sumRevenueByStatus(PaymentStatus.PAID);
        stats.setTotalRevenue(revenue != null ? revenue : 0.0);
        return stats;
    }
}
