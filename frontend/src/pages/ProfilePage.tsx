import React, { useState } from "react";
import { FaUserCircle, FaHistory, FaHeart, FaUsers, FaArrowLeft, FaBus, FaStar, FaWalking, FaTrain, FaMapMarkedAlt, FaPen } from "react-icons/fa";
import BadgeItem from "../components/BadgeItem";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  // State untuk form profil
  const [formData, setFormData] = useState({
    nama: "Asa Mitaka",
    email: "asa.mitaka@email.com",
    telepon: "+62 812 3456 7890",
    kota: "Jakarta Selatan",
    alamat: "Jl. Kemang Raya No. 10, Mampang Prapatan, Jakarta Selatan, 12730",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-layout">
      {/* SIDEBAR KIRI */}
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-subtitle">WORKSPACE</span>
          <h2 className="sidebar-title">Traveler Area</h2>
        </div>

        <nav className="sidebar-nav">
          <a href="#profil" className="nav-item active">
            <FaUserCircle className="nav-icon" /> Profil Saya
          </a>
          <a href="#riwayat" className="nav-item">
            <FaHistory className="nav-icon" /> Riwayat Booking
          </a>
          <a href="#wishlist" className="nav-item">
            <FaHeart className="nav-icon" /> Wishlist Saya
          </a>
          <a href="#grup" className="nav-item">
            <FaUsers className="nav-icon" /> Grup Perjalanan Saya
          </a>
        </nav>

        <button className="btn-back">
          <FaArrowLeft /> Kembali ke Beranda
        </button>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="profile-main">
        <header className="main-header">
          <h1>Profil Saya</h1>
          <p>Kelola informasi pribadi dan lihat pencapaian perjalanan Anda.</p>
        </header>

        <div className="content-grid">
          {/* KOLOM KIRI */}
          <div className="grid-left">
            {/* Form Informasi Profil */}
            <section className="card form-card">
              <div className="card-header">
                <div className="icon-circle bg-purple-light">
                  <FaPen className="text-purple" />
                </div>
                <h3>Informasi Profil</h3>
              </div>

              <form className="profile-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Nama Lengkap</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>Nomor Telepon</label>
                    <input type="text" name="telepon" value={formData.telepon} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Kota Asal</label>
                    <input type="text" name="kota" value={formData.kota} onChange={handleChange} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Alamat</label>
                  <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows={3}></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-save">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </section>

            {/* Banner Penawaran */}
            <section className="banner-card">
              <div className="banner-content">
                <span className="badge-gold">PENAWARAN EKSKLUSIF</span>
                <h3>Luxury Stay di Bandung</h3>
                <p>Diskon 20% khusus untuk Silver Member.</p>
              </div>
            </section>
          </div>

          {/* KOLOM KANAN */}
          <div className="grid-right">
            {/* Gamification Card */}
            <section className="card gamification-card">
              <span className="member-badge">SILVER MEMBER</span>
              <p className="gamification-title">Total Jarak Tempuh</p>
              <h2 className="gamification-value">
                1.240 <span>km via darat</span>
              </h2>

              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "62%" }}></div>
                </div>
                <p className="progress-text">760 km lagi menuju tingkatan Gold Member</p>
              </div>
            </section>

            {/* Daftar Badge */}
            <section className="card badge-list-card">
              <div className="card-header-flex">
                <h3>Badge Saya</h3>
                <a href="#semua" className="link-purple">
                  Lihat Semua
                </a>
              </div>
              <div className="badge-grid">
                <BadgeItem icon={<FaBus />} title="First Trip" description="Perjalanan darat pertama Anda" />
                <BadgeItem icon={<FaStar />} title="Explorer" description="Mengunjungi 5 kota berbeda" />
                <BadgeItem icon={<FaWalking />} title="Adventurer" description="Menjelajah rute pegunungan" />
                <BadgeItem icon={<FaTrain />} title="Globetrotter" description="Gunakan semua moda darat" />
              </div>
            </section>

            {/* Rencana Berikutnya */}
            <section className="card plan-card">
              <div className="icon-circle bg-purple-light">
                <FaMapMarkedAlt className="text-purple" />
              </div>
              <h3>Rencana Berikutnya?</h3>
              <p>Dapatkan rekomendasi rute kereta wisata terbaik.</p>
              <button className="btn-outline-purple">Mulai Eksplorasi</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
