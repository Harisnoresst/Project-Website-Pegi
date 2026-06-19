// src/components/NavbarGuest.tsx

import React from "react";

import "./NavbarGuest.css";

const NavbarGuest: React.FC = () => {
  const path = window.location.pathname;

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <a href="/">Pegi</a>
        </div>

        {/* MENU */}
        <nav className="navbar-menu">

          <a
            href="/hotel-search"
            className={`navbar-link ${
              path === "/hotel-search"
                ? "active"
                : ""
            }`}
          >
            Hotel
          </a>

          <a
            href="/transport-search"
            className={`navbar-link ${
              path === "/transport-search"
                ? "active"
                : ""
            }`}
          >
            Transportasi
          </a>

          <a
            href="/destination-search"
            className={`navbar-link ${
              path ===
              "/destination-search"
                ? "active"
                : ""
            }`}
          >
            Destinasi Wisata
          </a>

          <a
            href="/help"
            className={`navbar-link ${
              path === "/help"
                ? "active"
                : ""
            }`}
          >
            Pusat Bantuan
          </a>

        </nav>

        {/* AUTH */}
        <div className="navbar-auth">

          <a
            href="/register"
            className="btn-register"
          >
            Daftar
          </a>

          <a
            href="/login"
            className="btn-login"
          >
            Masuk
          </a>

        </div>

      </div>
    </header>
  );
};

export default NavbarGuest;