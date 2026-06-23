// src/components/NavbarUser.tsx

import React from "react";
import { MdNotificationsNone } from "react-icons/md";

import "./NavbarUser.css";

const NavbarUser: React.FC = () => {
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
            className="navbar-link active"
          >
            Hotel
          </a>

          <a
            href="/transport-search"
            className="navbar-link"
          >
            Transportasi
          </a>

          <a
            href="/destination-search"
            className="navbar-link"
          >
            Destinasi Wisata
          </a>

          <a
            href="#"
            className="navbar-link"
          >
            Pusat Bantuan
          </a>

        </nav>

        {/* USER SECTION */}
        <div className="navbar-user">

          <button className="notification-btn">
            <MdNotificationsNone />
          </button>

          <span className="navbar-username">
            USER
          </span>

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="navbar-avatar"
          />

        </div>

      </div>
    </header>
  );
};

export default NavbarUser;