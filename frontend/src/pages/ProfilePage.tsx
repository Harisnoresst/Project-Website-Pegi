import React, { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";
import {
  FaBus,
  FaStar,
  FaWalking,
  FaTrain,
  FaMapMarkedAlt,
  FaPen,
  FaLock,
} from "react-icons/fa";
import BadgeItem from "../components/BadgeItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProfilePage.css";
import TravelerSidebar from "../components/TravelerSidebar";

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kota: "",
    alamat: "",
    totalDistance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setFormData({ ...data, totalDistance: data.totalDistance || 0 });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data profil:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui profil.");
    }
  };

  const getTierInfo = (distance: number) => {
    if (distance >= 3000) {
      return {
        name: "GOLD MEMBER",
        nextTier: "MAX",
        progress: 100,
        remaining: 0,
        color: "#fbbf24",
      };
    } else if (distance >= 1000) {
      return {
        name: "SILVER MEMBER",
        nextTier: "Gold Member",
        progress: (distance / 3000) * 100,
        remaining: 3000 - distance,
        color: "#9ca3af",
      };
    } else {
      return {
        name: "BRONZE MEMBER",
        nextTier: "Silver Member",
        progress: (distance / 1000) * 100,
        remaining: 1000 - distance,
        color: "#b45309",
      };
    }
  };

  const tierInfo = getTierInfo(formData.totalDistance);

  const allBadges = [
    {
      id: 1,
      icon: <FaBus />,
      title: "First Trip",
      desc: "Perjalanan pertama Anda",
      reqDistance: 1,
    },
    {
      id: 2,
      icon: <FaStar />,
      title: "Explorer",
      desc: "Menempuh 500+ km",
      reqDistance: 500,
    },
    {
      id: 3,
      icon: <FaWalking />,
      title: "Adventurer",
      desc: "Menempuh 1.500+ km",
      reqDistance: 1500,
    },
    {
      id: 4,
      icon: <FaTrain />,
      title: "Globetrotter",
      desc: "Menempuh 5.000+ km",
      reqDistance: 5000,
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#2b3674",
          fontWeight: "bold",
        }}
      >
        Memuat data profil...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="profile-layout">
          <TravelerSidebar activeMenu="profil" />

          <main className="profile-main">
            <header className="main-header">
              <h1>Profil Saya</h1>
              <p>
                Kelola informasi pribadi dan lihat pencapaian perjalanan Anda.
              </p>
            </header>

            <div className="content-grid">
              <div className="grid-left">
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
                        <input
                          type="text"
                          name="nama"
                          value={formData.nama}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="input-group">
                        <label>Nomor Telepon</label>
                        <input
                          type="text"
                          name="telepon"
                          value={formData.telepon}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-group">
                        <label>Kota Asal</label>
                        <input
                          type="text"
                          name="kota"
                          value={formData.kota}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Alamat</label>
                      <textarea
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="form-actions">
                      <button className="btn-save" onClick={handleSave}>
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </section>

                <section className="banner-card">
                  <div className="banner-content">
                    <span className="badge-gold">PENAWARAN EKSKLUSIF</span>
                    <h3>Luxury Stay di Bandung</h3>
                    <p>Diskon 20% khusus untuk {tierInfo.name}.</p>
                  </div>
                </section>
              </div>

              <div className="grid-right">
                <section className="card gamification-card">
                  <span
                    className="member-badge"
                    style={{ backgroundColor: tierInfo.color }}
                  >
                    {tierInfo.name}
                  </span>
                  <p className="gamification-title">Total Jarak Tempuh</p>
                  <h2 className="gamification-value">
                    {formData.totalDistance.toLocaleString("id-ID")}{" "}
                    <span>km via darat</span>
                  </h2>

                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${tierInfo.progress}%`,
                          backgroundColor: tierInfo.color,
                        }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      {tierInfo.remaining > 0
                        ? `${tierInfo.remaining.toLocaleString("id-ID")} km lagi menuju tingkatan ${tierInfo.nextTier}`
                        : "Anda telah mencapai tingkatan tertinggi!"}
                    </p>
                  </div>
                </section>

                <section className="card badge-list-card">
                  <div className="card-header-flex">
                    <h3>Badge Saya</h3>
                  </div>
                  <div className="badge-grid">
                    {allBadges.map((badge) => {
                      const isUnlocked =
                        formData.totalDistance >= badge.reqDistance;

                      return (
                        <div
                          key={badge.id}
                          style={{
                            opacity: isUnlocked ? 1 : 0.4,
                            filter: isUnlocked ? "none" : "grayscale(100%)",
                          }}
                        >
                          <BadgeItem
                            icon={isUnlocked ? badge.icon : <FaLock />}
                            title={badge.title}
                            description={
                              isUnlocked
                                ? badge.desc
                                : `Butuh ${badge.reqDistance} km`
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="card plan-card">
                  <div className="icon-circle bg-purple-light">
                    <FaMapMarkedAlt className="text-purple" />
                  </div>
                  <h3>Rencana Berikutnya?</h3>
                  <p>Dapatkan rekomendasi rute kereta wisata terbaik.</p>
                  <a href="/">
                    <button className="btn-outline-purple">
                      Mulai Eksplorasi
                    </button>
                  </a>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
