package com.pegi.backend.service;

import com.pegi.backend.entity.Role;
import com.pegi.backend.entity.User;
import com.pegi.backend.entity.enums.RoleType;
import com.pegi.backend.repository.RoleRepository;
import com.pegi.backend.repository.UserRepository;
import com.pegi.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // ===== REGISTER =====
    public Map<String, Object> register(Map<String, String> request) {
        String email = request.get("email");
        String name  = request.get("name");
        String password = request.get("password");

        // Cek email sudah dipakai atau belum
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email sudah terdaftar");
        }

        // Ambil role USER (default untuk user baru)
        Role userRole = roleRepository.findByName(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("Role USER tidak ditemukan. Jalankan DataSeeder dulu!"));

        // Buat dan simpan user baru
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password)) // hash password
                .role(userRole)
                .build();

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Registrasi berhasil");
        response.put("email", email);
        return response;
    }

    // ===== LOGIN =====
    public Map<String, Object> login(Map<String, String> request) {
        String email    = request.get("email");
        String password = request.get("password");

        // Autentikasi via Spring Security (akan throw exception jika gagal)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // Generate JWT token
        String token = jwtUtil.generateToken(email);

        // Ambil data user untuk respons
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("token", token);
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().getName().name());
        return response;
    }
}
