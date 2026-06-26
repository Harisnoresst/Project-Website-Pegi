import React from "react";
import "./Navbar.css";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  avatar?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  username = "USER",
  avatar = "/images/avatar.png",
}) => {
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
              path === "/hotel-search" ? "active" : ""
            }`}
          >
            Hotel
          </a>

          <a
            href="/transport-search"
            className={`navbar-link ${
              path === "/transport-search" ? "active" : ""
            }`}
          >
            Transportasi
          </a>

          <a
            href="/destination-search"
            className={`navbar-link ${
              path === "/destination-search" ? "active" : ""
            }`}
          >
            Destinasi Wisata
          </a>

          <a
            href="/help-center"
            className={`navbar-link ${
              path === "/help-center" ? "active" : ""
            }`}
          >
            Pusat Bantuan
          </a>
        </nav>

        {/* RIGHT */}
        {isLoggedIn ? (
          <div className="navbar-user">

            {/* Notification */}
            <a href="/booking-history" className="navbar-notification">
              🔔
            </a>

            {/* Profile */}
            <a href="/profile" className="navbar-profile">

              <span>{username}</span>

              <img
                src={avatar}
                alt={username}
              />

            </a>

          </div>
        ) : (
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
        )}

      </div>
    </header>
  );
};

export default Navbar;