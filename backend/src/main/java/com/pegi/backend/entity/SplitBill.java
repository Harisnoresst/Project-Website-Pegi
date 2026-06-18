package com.pegi.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "split_bills")

public class SplitBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long groupId;
    private Double totalAmount;

    @OneToMany(mappedBy = "splitBill", cascade = CascadeType.ALL)
    private List<BillMember> members;
    
}
