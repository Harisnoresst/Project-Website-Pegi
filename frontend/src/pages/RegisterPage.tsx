// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import './RegisterPage.css'; 

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }
    console.log('Register Data Submitted:', { fullName, email, password, acceptTerms });
  };

  return (
    <div className="register-wrapper">
      {/* SEBELAH KIRI - Hero Banner */}
      <div className="register-left">
        <div className="glass-card">
          <h3>Perjalanan yang Lebih Bermakna.</h3>
          <p>
            Jelajahi keindahan Indonesia dengan kenyamanan yang belum pernah ada sebelumnya. 
            Dari hotel mewah hingga transportasi yang handal, Pegi siap menemani setiap langkah Anda.
          </p>
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

      {/* SEBELAH KANAN - Form Area */}
      <div className="register-right">
        <div className="form-container">
          
          {/* Header */}
          <div className="form-header">
            <h1 className="logo-text">Pegi</h1>
            <div className="badge-bonus">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Bonus 100 Poin Pengguna Baru!
            </div>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className="tab-btn" onClick={() => window.location.href = '/login'}>Masuk</button>
            <button className="tab-btn active">Daftar</button>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Input Nama Lengkap */}
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

            {/* Input Email */}
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

            {/* Input Password */}
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
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            {/* Input Konfirmasi Password */}
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
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            {/* Checkbox Syarat & Ketentuan */}
            <label className="checkbox-group">
              <input 
                type="checkbox" 
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span className="checkbox-label">
                Saya menyetujui <a href="#terms" className="text-purple">Syarat & Ketentuan</a> serta <a href="#privacy" className="text-purple">Kebijakan Privasi</a>
              </span>
            </label>

            {/* Button Submit */}
            <button type="submit" className="btn-primary">
              Daftar Akun Baru
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">ATAU DAFTAR DENGAN</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Buttons with React Icons */}
          <div className="social-login-group">
            <button className="btn-social" type="button">
              <FcGoogle />
              Google
            </button>
            <button className="btn-social" type="button">
              <FaApple />
              Apple
            </button>
          </div>

          {/* Bottom Login Prompt */}
          <p className="login-prompt">
            Sudah punya akun? <a href="/login">Masuk Sekarang</a>
          </p>

          {/* Footer Links */}
          <div className="form-footer">
            <a href="#terms">Syarat & Ketentuan</a>
            <a href="#privacy">Kebijakan Privasi</a>
            <a href="#help">Bantuan</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;