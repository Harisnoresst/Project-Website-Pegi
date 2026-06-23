// src/pages/LoginPage.tsx
import React, { useState } from "react";
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

  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); 

    try {
      // 1. Tembak API Login ke Backend Java
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: email,
        password: password,
      });

      // 2. CEK RESPONS BERDASARKAN JABATAN (ADMIN vs USER)
      if (response.data.token) {
        // JALUR ADMIN: Token langsung turun
        localStorage.setItem("token", response.data.token);
        console.log("Login Admin Sukses, Token disimpan!");
        
        // Pindah otomatis ke halaman Admin Dashboard
        navigate("/admin"); 
        
      } else if (response.data.status === "otp_sent") {
        // JALUR USER: Disuruh nunggu OTP
        console.log("OTP dikirim ke email, pindah ke halaman verifikasi...");
        
        // Pindah ke halaman form input OTP (Kalian harus bikin file VerifyOtpPage.tsx nanti)
        navigate("/verify-otp", { state: { email: email } });
      }

    } catch (error: any) {
      console.error("Gagal login:", error);
      if (error.response && error.response.status === 403) {
        setErrorMsg("Akses ditolak, email atau password salah.");
      } else {
        setErrorMsg("Gagal terhubung ke server. Pastikan Backend nyala!");
      }
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Bonus 100 Poin Pengguna Baru!
              </div>
            </div>

            <div className="login-tabs">
              <button className="login-tab-btn active">Masuk</button>
              <button
                className="login-tab-btn"
                onClick={() => navigate("/register")}
              >
                Daftar
              </button>
            </div>

            {errorMsg && (
              <div style={{ color: "red", marginBottom: "15px", fontSize: "14px", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px" }}>
                {errorMsg}
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

              <button type="submit" className="login-btn-primary">
                Masuk
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
    </>
  );
};

export default LoginPage;