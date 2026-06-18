package com.pegi.backend.repository;

import com.pegi.backend.entity.SplitBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SplitBillRepository extends JpaRepository<SplitBill, Long> {
    
}
