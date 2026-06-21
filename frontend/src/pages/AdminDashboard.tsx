import React, { useState, useEffect } from "react";
import { FaUsers, FaMapMarkerAlt,  FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";
import "./AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from '../components/AdminTopbar';
import StatistikChart from "../components/StatistikChart";
import { getDashboardStats } from "../services/adminService"; // Pastikan import API ada

const AdminDashboard: React.FC = () => {

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardStats();
        setDashboardData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="admin-layout">
        <AdminSidebar activeMenu="dashboard" />
        <main className="admin-main">
          <AdminTopbar />
          <div style={{ padding: '40px', color: '#2b3674', fontWeight: 'bold' }}>
            Memuat data dashboard...
          </div>
        </main>
      </div>
    );
  }

  const stats = dashboardData?.stats || [];
  const popularDestinations = dashboardData?.popularDestinations || [];
  const recentBookings = dashboardData?.recentBookings || [];
  const newUsers = dashboardData?.newUsers || [];

  const getStatIcon = (title: string) => {
    if (!title) return <FaUsers />; // Default jika kosong
    
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("pengguna")) return <FaUsers />;
    if (lowerTitle.includes("booking")) return <FaTicketAlt />;
    if (lowerTitle.includes("destinasi")) return <FaMapMarkerAlt />;
    if (lowerTitle.includes("pendapatan")) return <FaMoneyBillWave />;
    
    return <FaUsers />; // Ikon default
  };


  return (
    <div className="admin-layout">
      
      <AdminSidebar activeMenu="dashboard" />

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        <AdminTopbar />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Selamat Datang Admin</h1>
          </div>

          <div className="stats-grid">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="stat-card">
                
                <div className={`stat-icon-wrapper ${stat.color || 'text-purple'}`}>
                  {/* Panggil fungsi getStatIcon di sini */}
                  {getStatIcon(stat.title)}
                </div>
                
                <div className="stat-details">
                  <p className="stat-title">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                </div>

              </div>
            ))}
          </div>

          <div className="middle-grid">
            
            <StatistikChart />

            <div className="admin-card">
              <h3>Destinasi Populer</h3>
              <div className="popular-list">
                {popularDestinations.map((dest: any, idx: number) => (
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

          <div className="bottom-grid">
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
                  {recentBookings.map((bk: any, idx: number) => (
                    <tr key={idx}>
                      <td className="fw-500 text-dark">{bk.id}</td>
                      <td>
                        <div className="user-cell">
                          <span className={`user-init ${bk.color || 'bg-purple-light'}`}>{bk.init}</span>
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

            <div className="admin-card">
              <h3>Pendaftaran Baru</h3>
              <div className="new-users-list">
                {newUsers.map((user: any, idx: number) => (
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