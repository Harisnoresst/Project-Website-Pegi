// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import "./LoginPage.css";
import NavbarGuest from "../components/NavbarGuest";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState(""); 
  const [successMsg, setSuccessMsg] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!showOtpModal || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [showOtpModal, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleResendOtp = async () => {
    setTimeLeft(120); 
    setOtp("");
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/resend-otp", {
        email: email,
      });

      if (response.status === 200) {
        setSuccessMsg("Kode OTP baru berhasil dikirim!");
      } else {
        setErrorMsg("Gagal mengirim ulang kode. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error API:", error);
      setErrorMsg("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string, target: HTMLInputElement) => {
    if (/^\d?$/.test(value)) {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      if (value && target.nextElementSibling) {
        (target.nextElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && e.currentTarget.previousElementSibling) {
      (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); 
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Login Admin Sukses, Token disimpan!");
        navigate("/admin"); 
      } else if (response.data.status === "otp_sent") {
        console.log("OTP dikirim ke email, memunculkan popup verifikasi...");
        setTimeLeft(120);
        setShowOtpModal(true);
      }

    } catch (error: any) {
      console.error("Gagal login:", error);
      if (error.response && error.response.status === 403) {
        setErrorMsg("Akses ditolak, email atau password salah.");
      } else {
        setErrorMsg("Gagal terhubung ke server. Pastikan Backend nyala!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================================
  // FUNGSI VERIFIKASI (DENGAN LOG DEBUG)
  // ========================================================
  const handleVerifyAndLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // 🔍 1. KITA CEK DATA APA YANG DIKIRIM KE JAVA DI CONSOLE BROWSER
    console.log("🚀 DATA YANG DIKIRIM KE JAVA:", { email: email, otp: otp });

    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
        email: email,
        
        // ⚠️ PENTING: 
        // Kalau di console log datanya udah bener tapi Java tetep error 500,
        // Coba ganti tulisan 'otp: otp' di bawah ini jadi 'code: otp' atau 'otpCode: otp'
        // Tergantung nama variabel di DTO Java kamu!
        otp: otp, 
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Login User Sukses, Token disimpan!");
        
        setShowOtpModal(false);
        navigate("/"); 
      } else {
        setErrorMsg("Verifikasi gagal. Silakan coba lagi.");
      }

    } catch (error: any) {
      console.error("Gagal verifikasi OTP:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Kode OTP salah atau sudah kedaluwarsa!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarGuest />

      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-glass-card">
            <h3>Perjalanan yang Lebih Bermakna.</h3>
            <p>
              Jelajahi keindahan Indonesia dengan kenyamanan yang belum pernah
              ada sebelumnya. Dari hotel mewah hingga transportasi yang handal,
              Pegi siap menemani setiap langkah Anda.
            </p>
            <div className="login-testimonial">
              <div className="login-avatar-group">
                <div className="login-avatar"></div>
                <div className="login-avatar"></div>
                <div className="login-avatar"></div>
              </div>
              <span className="login-testimonial-text">
                1jt+ Wisatawan Puas
              </span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <h1 className="login-logo">Pegi</h1>
              <div className="login-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Bonus 100 Poin Pengguna Baru!
              </div>
            </div>

            <div className="login-tabs">
              <button className="login-tab-btn active">Masuk</button>
              <button className="login-tab-btn" onClick={() => navigate("/register")}>
                Daftar
              </button>
            </div>

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

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label className="login-label">Email</label>
                <div className="login-input-wrapper">
                  <span className="login-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="login-control"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-input-group">
                <div className="login-input-header">
                  <label className="login-label">Kata Sandi</label>
                  <a href="#forgot" className="login-forgot">
                    Lupa Kata Sandi?
                  </a>
                </div>
                <div className="login-input-wrapper">
                  <span className="login-icon-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login-control"
                    placeholder="Min. 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="login-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              <label className="login-checkbox-group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="login-checkbox-label">
                  Ingat saya di perangkat ini
                </span>
              </label>

              <button type="submit" className="login-btn-primary" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <div className="login-divider">
              <div className="login-divider-line"></div>
              <span className="login-divider-text">ATAU MASUK DENGAN</span>
              <div className="login-divider-line"></div>
            </div>

            <div className="login-social-group">
              <button className="login-btn-social" type="button">
                <FcGoogle />
                Google
              </button>
              <button className="login-btn-social" type="button">
                <FaApple />
                Apple
              </button>
            </div>

            <p className="login-prompt">
              Belum punya akun? <a href="/register">Daftar Sekarang</a>
            </p>

            <div className="login-footer">
              <a href="#terms">Syarat & Ketentuan</a>
              <a href="#privacy">Kebijakan Privasi</a>
              <a href="#help">Bantuan</a>
            </div>
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
            <h2>Verifikasi Login</h2>
            <p>
              Demi keamanan, masukkan 6 digit kode OTP yang telah dikirimkan ke alamat email anda <strong>({email.substring(0, 3)}***@gmail.com)</strong>
            </p>

            <div className="otp-inputs">
              {[...Array(6)].map((_, i) => (
                <input 
                  key={i} 
                  type="text" 
                  maxLength={1} 
                  value={otp[i] || ""} 
                  onChange={(e) => handleOtpChange(i, e.target.value, e.target)} 
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  disabled={isLoading} 
                />
              ))}
            </div>

            {timeLeft > 0 ? (
              <p className="otp-timer">Kirim ulang kode dalam {formatTime(timeLeft)}</p>
            ) : (
              <p className="otp-timer" style={{ cursor: "pointer", color: "#7B3FE4", textDecoration: "underline" }} onClick={handleResendOtp}>
                Kirim ulang kode OTP
              </p>
            )}

            <button 
              className="btn-verify-create" 
              disabled={otp.length !== 6 || isLoading} 
              onClick={handleVerifyAndLogin}
            >
              {isLoading ? "Memverifikasi..." : "Verifikasi & Masuk"}
            </button>

            <button 
              className="btn-back-register" 
              onClick={() => setShowOtpModal(false)} 
              disabled={isLoading}
            >
              ← Batal & Kembali
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;