package com.pegi.backend.service;

import com.pegi.backend.entity.OtpVerification;
import com.pegi.backend.entity.Role;
import com.pegi.backend.entity.User;
import com.pegi.backend.entity.enums.RoleType;
import com.pegi.backend.repository.OtpVerificationRepository;
import com.pegi.backend.repository.RoleRepository;
import com.pegi.backend.repository.UserRepository;
import com.pegi.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmailOtpService emailOtpService;

    // ===== REGISTER ===== (tidak berubah)
    public Map<String, Object> register(Map<String, String> request) {
        String email = request.get("email");
        String name  = request.get("name");
        String password = request.get("password");

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email sudah terdaftar");
        }

        Role userRole = roleRepository.findByName(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("Role USER tidak ditemukan. Jalankan DataSeeder dulu!"));

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(userRole)
                .build();

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Registrasi berhasil");
        response.put("email", email);
        return response;
    }

    // ===== LOGIN — TAHAP 1: validasi password, cek ADMIN bypass, atau kirim OTP =====
    public Map<String, Object> login(Map<String, String> request) {
        String email    = request.get("email");
        String password = request.get("password");

        try {
            // Validasi email + password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (Exception e) {
            // INI BAKAL NGE-PRINT ALASAN ASLINYA KE TERMINAL JAVA LU
            System.err.println("!!! GAGAL LOGIN BRO !!! Alasan dari Java: " + e.getMessage());
            throw new RuntimeException("Gagal Otentikasi: " + e.getMessage());
        }

        // Validasi email + password dulu (kalau salah, langsung throw exception)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // Ambil data user dari database untuk mengecek jabatannya (Role)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        // Cek apakah user adalah ADMIN
        if (user.getRole().getName() == RoleType.ADMIN) {
            // JALUR TOL: Kalau ADMIN, langsung kasih JWT Token tanpa OTP
            String token = jwtUtil.generateToken(email);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Login Admin Berhasil");
            response.put("token", token);
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().getName().name());
            return response;
        }

        // JALUR REGULER: Kalau bukan ADMIN (USER BIASA), lanjut kirim OTP
        // Generate kode OTP 6 digit acak
        String otpCode = String.format("%06d", new Random().nextInt(1_000_000));

        // Simpan OTP ke database, berlaku 5 menit
        OtpVerification otp = OtpVerification.builder()
                .email(email)
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .build();
        otpVerificationRepository.save(otp);

        // Kirim kode OTP ke email user
        emailOtpService.sendOtpEmail(email, otpCode);

        // Response: BELUM kasih token, baru kasih info OTP terkirim
        Map<String, Object> response = new HashMap<>();
        response.put("status", "otp_sent");
        response.put("message", "Kode OTP telah dikirim ke email kamu, silakan verifikasi");
        response.put("email", email);
        return response;
    }

    // ===== LOGIN — TAHAP 2: verifikasi OTP, baru kasih token ===== (tidak berubah)
    public Map<String, Object> verifyOtp(Map<String, String> request) {
        String email   = request.get("email");
        String otpCode = request.get("otpCode");

        // Ambil OTP terbaru milik email ini yang belum diverifikasi
        OtpVerification otp = otpVerificationRepository
                .findTopByEmailAndVerifiedFalseOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new RuntimeException(
                        "Kode OTP tidak ditemukan, silakan login ulang"
                ));

        // Cek apakah sudah expired (lebih dari 5 menit)
        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Kode OTP sudah expired, silakan login ulang");
        }

        // Cek apakah kode yang diinput cocok
        if (!otp.getOtpCode().equals(otpCode)) {
            throw new RuntimeException("Kode OTP salah");
        }

        // Tandai OTP sudah dipakai supaya tidak bisa dipakai ulang
        otp.setVerified(true);
        otpVerificationRepository.save(otp);

        // Baru sekarang generate JWT token
        String token = jwtUtil.generateToken(email);

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

    // ===== RESEND OTP ===== (tidak berubah)
    public Map<String, Object> resendOtp(Map<String, String> request) {
        String email = request.get("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        String otpCode = String.format("%06d", new Random().nextInt(1_000_000));

        OtpVerification otp = OtpVerification.builder()
                .email(email)
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .build();
        otpVerificationRepository.save(otp);

        emailOtpService.sendOtpEmail(email, otpCode);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "otp_sent");
        response.put("message", "Kode OTP baru telah dikirim ulang ke email kamu");
        return response;
    }
}