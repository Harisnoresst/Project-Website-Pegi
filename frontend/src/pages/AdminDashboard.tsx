import React from "react";
import { FaUsers, FaMapMarkerAlt,  FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";
import "./AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from '../components/AdminTopbar';
import StatistikChart from "../components/StatistikChart";

const AdminDashboard: React.FC = () => {
  // --- DUMMY DATA ---
  const stats = [
    { title: "Total Pengguna", value: "12,543",  isPositive: true, icon: <FaUsers />, color: "text-purple" },
    { title: "Total Booking", value: "3,892",  isPositive: true, icon: <FaTicketAlt />, color: "text-purple" },
    { title: "Total Destinasi", value: "428",  isPositive: false, icon: <FaMapMarkerAlt />, color: "text-yellow" },
    { title: "Pendapatan Bulan Ini", value: "Rp 1.42B",  isPositive: true, icon: <FaMoneyBillWave />, color: "text-green" },
  ];

  const popularDestinations = [
    { name: "Bali, Indonesia", percent: 85, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80" },
    { name: "Agra, India", percent: 62, img: "https://animehunch.com/wp-content/uploads/2023/01/Asa-Mitaka.jpg" },
    { name: "Kyoto, Japan", percent: 48, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=100&q=80" },
    { name: "Singapore", percent: 35, img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=100&q=80" },
  ];

  const recentBookings = [
    { id: "#BK-9021", user: "Andi Setiawan", dest: "Nusa Penida, Bali", status: "Sukses", amount: "Rp 4,200,000", init: "AS", color: "bg-purple-light" },
    { id: "#BK-9020", user: "Budi Pratama", dest: "Candi Borobudur", status: "Menunggu", amount: "Rp 1,850,000", init: "BP", color: "bg-purple-light" },
    { id: "#BK-9019", user: "Dewi Wijaya", dest: "Labuan Bajo", status: "Sukses", amount: "Rp 8,400,000", init: "DW", color: "bg-yellow-light" },
    { id: "#BK-9018", user: "Rina Kartika", dest: "Pulau Derawan", status: "Gagal", amount: "Rp 5,100,000", init: "RK", color: "bg-red-light" },
  ];

  const newUsers = [
    { name: "Fajri Ramadhan", time: "Baru saja bergabung", img: "https://i.pravatar.cc/150?img=11" },
    { name: "Siska Amelia", time: "2 menit yang lalu", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Candra Kusuma", time: "15 menit yang lalu", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Maya Putri", time: "1 jam yang lalu", img: "https://i.pravatar.cc/150?img=9" },
  ];

  return (
    <div className="admin-layout">
      
      <AdminSidebar activeMenu="dashboard" />

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        {/* TOP NAVBAR */}
        <AdminTopbar />

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Selamat Datang Admin</h1>
            <p>Laporan sistem menunjukkan performa platform stabil dengan kenaikan trafik 12% pagi ini.</p>
          </div>

          {/* 1. Stats Row */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-header">
                  <div className={`stat-icon-wrapper ${stat.color}`}>{stat.icon}</div>
                  <span className={`stat-percent ${stat.isPositive ? "text-green" : "text-yellow"}`}></span>
                </div>
                <p className="stat-title">{stat.title}</p>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            ))}
          </div>

          <div className="middle-grid">
            
            <StatistikChart />

            {/* Popular Destinations */}
            <div className="admin-card">
              <h3>Destinasi Populer</h3>
              <div className="popular-list">
                {popularDestinations.map((dest, idx) => (
                  <div key={idx} className="popular-item">
                    <img src={dest.img} alt={dest.name} />
                    <div className="popular-info">
                      <span className="dest-name">{dest.name}</span>
                      <div className="progress-bg">
                        <div className="progress-fill" style={{ width: `${dest.percent}%` }}></div>
                      </div>
                    </div>
                    <span className="dest-percent">{dest.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bottom Row: Table & New Users */}
          <div className="bottom-grid">
            {/* Table Recent Bookings */}
            <div className="admin-card table-card">
              <div className="card-header-flex">
                <h3>Aktivitas Booking Terbaru</h3>
                <a href="#semua" className="link-purple">Lihat Semua</a>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID BOOKING</th>
                    <th>PENGGUNA</th>
                    <th>DESTINASI</th>
                    <th>STATUS</th>
                    <th>JUMLAH</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((bk, idx) => (
                    <tr key={idx}>
                      <td className="fw-500 text-dark">{bk.id}</td>
                      <td>
                        <div className="user-cell">
                          <span className={`user-init ${bk.color}`}>{bk.init}</span>
                          {bk.user}
                        </div>
                      </td>
                      <td>{bk.dest}</td>
                      <td>
                        <span className={`status-badge ${bk.status === "Sukses" ? "badge-green" : bk.status === "Menunggu" ? "badge-yellow" : "badge-red"}`}>{bk.status}</span>
                      </td>
                      <td className="fw-500 text-dark">{bk.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* New Users List */}
            <div className="admin-card">
              <h3>Pendaftaran Baru</h3>
              <div className="new-users-list">
                {newUsers.map((user, idx) => (
                  <div key={idx} className="new-user-item">
                    <img src={user.img} alt={user.name} />
                    <div className="new-user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-time">{user.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/admin/users">
                <button className="btn-outline-full">Lihat Direktori Pengguna</button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;