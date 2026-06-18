package com.pegi.backend.repository;

import com.pegi.backend.entity.Group;
import com.pegi.backend.entity.GroupMember;
import com.pegi.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    // Cek apakah user sudah menjadi anggota grup
    boolean existsByGroupAndUser(Group group, User user);

    // Cari data keanggotaan spesifik
    Optional<GroupMember> findByGroupAndUser(Group group, User user);

    // Ambil semua grup yang diikuti oleh user
    List<GroupMember> findByUser(User user);

    // Hitung jumlah grup yang diikuti user (untuk logika badge)
    long countByUser(User user);
}
