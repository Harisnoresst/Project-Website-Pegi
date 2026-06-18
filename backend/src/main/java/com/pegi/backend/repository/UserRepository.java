package com.pegi.backend.repository;

import com.pegi.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Cari user berdasarkan email (dipakai saat login & JWT)
    Optional<User> findByEmail(String email);

    // Cek apakah email sudah terdaftar (dipakai saat register)
    boolean existsByEmail(String email);
}
