// src/pages/RegisterPage.tsx
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Menggunakan navigate untuk pindah halaman
import axios from "axios"; 
import "./RegisterPage.css";
import NavbarGuest from "../components/NavbarGuest";

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // State untuk menampilkan pesan sukses/error di UI
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // State & Logika untuk OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 120 detik = 02:00

  const navigate = useNavigate();

  // Efek untuk menjalankan hitung mundur saat modal terbuka
  useEffect(() => {
    if (!showOtpModal || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [showOtpModal, timeLeft]);

  // Fungsi untuk memformat detik menjadi MM:SS (Contoh: 119 -> 01:59)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  // Fungsi saat pengguna klik "Kirim Ulang Kode OTP"
  const handleResendOtp = async () => {
    setTimeLeft(120); // Reset timer kembali ke 2 menit
    setOtp(""); // Kosongkan kotak input OTP
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setErrorMsg("Gagal mengirim ulang kode. Silakan coba lagi.");
      } else {
        setSuccessMsg("Kode OTP baru berhasil dikirim!");
      }
    } catch (error) {
      console.error("Error API:", error);
      setErrorMsg("Tidak terhubung ke server, namun timer tetap direset (Mode Simulasi).");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));
    }
  };

  // Saat klik Daftar Akun
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Kata sandi tidak cocok!");
      return;
    }
    if (!acceptTerms) {
      setErrorMsg("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    setIsLoading(true);

    try {
      // 🔥 PERBAIKAN: Menggunakan request-otp untuk pendaftaran awal, BUKAN resend-otp
      const response = await fetch("http://localhost:8080/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // 🌟 AMAN DARI CRASH: Baca respon sebagai teks mentah dulu agar tidak memicu JSON parse error
      const responseText = await response.text();
      let errorData: any = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (jsonErr) {
        errorData = { message: responseText };
      }

      if (response.ok) {
        // Pengecekan aman jika status OK tapi ada pesan error tersembunyi
        if (
          errorData.status === "error" || 
          errorData.message?.toLowerCase().includes("terdaftar") || 
          errorData.message?.toLowerCase().includes("exist")
        ) {
          setErrorMsg(errorData.message || "Email sudah terdaftar! Harap gunakan email lain.");
          setIsLoading(false);
          return;
        }

        setTimeLeft(120); // Mulai timer dari awal
        setShowOtpModal(true); // Munculkan popup resmi
      } else {
        const isEmailRegistered = 
          response.status === 409 || 
          response.status === 400 || 
          errorData.message?.toLowerCase().includes("terdaftar") ||
          responseText.toLowerCase().includes("terdaftar");

        if (isEmailRegistered) {
          setErrorMsg("Email sudah terdaftar! Harap gunakan email lain.");
        } else {
          setErrorMsg(errorData.message || "Gagal mengirim OTP.");
        }
      }
    } catch (error) {
      console.error("Error API:", error);
      // 🔥 PINTU BELAKANG DITUTUP: Jika error/gagal koneksi, tampilkan pesan error asli dan JANGAN buka modal OTP!
      setErrorMsg("Gagal terhubung ke Server. Pastikan backend Anda sudah aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  // Saat klik Verifikasi di Modal OTP
  const handleVerifyAndRegister = () => {
    setIsLoading(true);
    setErrorMsg("");

    // Simulasi mengecek ke Database selama 1.5 detik
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(false);
      navigate("/"); // Menggunakan React Router navigate menuju Dashboard
    }, 1500);
  };

  return (
    <>
      <NavbarGuest />

      <div className="register-wrapper">
        <div className="register-left">
          <div className="glass-card">
            <h3>Perjalanan yang Lebih Bermakna.</h3>
            <p>Jelajahi keindahan Indonesia dengan kenyamanan yang belum pernah ada sebelumnya. Dari hotel mewah hingga transportasi yang handal, Pegi siap menemani setiap langkah Anda.</p>
            <div className="testimonial-info">
              <div className="avatar-group">
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
              </div>
              <span className="testimonial-text">1jt+ Wisatawan Puas</span>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="form-container">
            <div className="form-header">
              <h1 className="logo-text">Pegi</h1>
              <div className="badge-bonus">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Bonus 100 Poin Pengguna Baru!
              </div>
            </div>

            <div className="auth-tabs">
              <button className="tab-btn" onClick={() => navigate("/login")}>
                Masuk
              </button>
              <button className="tab-btn active">Daftar</button>
            </div>

            {/* Area Pesan Notifikasi Sukses / Error */}
            {errorMsg && (
              <div style={{ color: "red", marginBottom: "15px", fontSize: "14px", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px" }}>
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div style={{ color: "green", marginBottom: "15px", fontSize: "14px", backgroundColor: "#e6ffe6", padding: "10px", borderRadius: "5px" }}>
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Nama Lengkap</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama lengkap Anda"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Alamat Email</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Kata Sandi</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Min. 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Konfirmasi Kata Sandi</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Ketik ulang kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              <label className="checkbox-group">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} required />
                <span className="checkbox-label">
                  Saya menyetujui{" "}
                  <a href="#terms" className="text-purple">Syarat & Ketentuan</a>{" "}
                  serta{" "}
                  <a href="#privacy" className="text-purple">Kebijakan Privasi</a>
                </span>
              </label>

              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Daftar Akun Baru"}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">ATAU DAFTAR DENGAN</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-login-group">
              <button className="btn-social" type="button">
                <FcGoogle /> Google
              </button>
              <button className="btn-social" type="button">
                <FaApple /> Apple
              </button>
            </div>

            <p className="login-prompt">
              Sudah punya akun? <a href="/login">Masuk Sekarang</a>
            </p>
          </div>
        </div>
      </div>

      {/* MODAL OTP */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal">
            <div className="otp-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2>Verifikasi Pendaftaran</h2>
            <p>
              Demi keamanan, masukkan 6 digit kode OTP yang telah dikirimkan ke alamat email anda <strong>({email.substring(0, 3)}***@gmail.com)</strong>
            </p>

            <div className="otp-inputs">
              {[...Array(6)].map((_, i) => (
                <input key={i} type="text" maxLength={1} value={otp[i] || ""} onChange={(e) => handleOtpChange(i, e.target.value)} disabled={isLoading} />
              ))}
            </div>

            {timeLeft > 0 ? (
              <p className="otp-timer">Kirim ulang kode dalam {formatTime(timeLeft)}</p>
            ) : (
              <p className="otp-timer" style={{ cursor: "pointer", color: "#7B3FE4", textDecoration: "underline" }} onClick={handleResendOtp}>
                Kirim ulang kode OTP
              </p>
            )}

            <button className="btn-verify-create" disabled={otp.length !== 6 || isLoading} onClick={handleVerifyAndRegister}>
              {isLoading ? "Memverifikasi..." : "Verifikasi & Buat Akun"}
            </button>

            <button className="btn-back-register" onClick={() => setShowOtpModal(false)} disabled={isLoading}>
              ← Kembali ke halaman Daftar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;