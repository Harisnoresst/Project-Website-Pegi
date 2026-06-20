import React, { useState } from "react";
import { FaCalendarAlt, FaFileDownload, FaMoneyBillWave, FaMobileAlt, FaUserFriends, FaBullseye, FaCircle } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import StatistikChart from "../components/StatistikChart";
import "./AdminMonitoringPage.css";

const AdminMonitoringPage: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState("2023-10-31");

  const formatDate = (dateString: string) => {
    if (!dateString) return "Pilih Tanggal";
    const d = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    return `${d.getDate().toString().padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleExportPDF = () => {
    const d = new Date(startDate);
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const monthName = `${months[d.getMonth()]}_${d.getFullYear()}`;
    
    const originalTitle = document.title;
    document.title = `Laporan_Performa_Pegi_${monthName}`;
    
    window.print();
    
    document.title = originalTitle;
  };

  return (

    <div className="admin-layout">
      <AdminSidebar activeMenu="monitoring" />

      <main className="admin-main">
        <AdminTopbar />

        <div className="monitoring-container">
          <div className="monitoring-header">
            <div className="title-area">
              <h1>Monitoring Sistem</h1>
              <p>Data performa real-time seluruh ekosistem Pegi.</p>
            </div>
            <div className="header-actions">
              <div className="date-picker-container">
                <button className="btn-outline-gray" onClick={() => setShowDatePicker(!showDatePicker)}>
                  <FaCalendarAlt className="text-gray" /> {formatDate(startDate)} - {formatDate(endDate)}
                </button>

                {showDatePicker && (
                  <div className="date-picker-popup">
                    <div className="dp-field">
                      <label>Tanggal Mulai</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="dp-field">
                      <label>Tanggal Selesai</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button className="btn-primary dp-btn" onClick={() => setShowDatePicker(false)}>
                      Terapkan
                    </button>
                  </div>
                )}
              </div>

              <button className="btn-primary" onClick={handleExportPDF}>
                <FaFileDownload /> Export PDF
              </button>
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon bg-purple-light text-purple">
                  <FaMoneyBillWave />
                </div>
              </div>
              <p className="kpi-label">Pendapatan Bulan Ini</p>
              <h2 className="kpi-value">Rp 4.2M</h2>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon bg-pink-light text-pink">
                  <FaMobileAlt />
                </div>
              </div>
              <p className="kpi-label">Total Booking</p>
              <h2 className="kpi-value">12,450</h2>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon bg-orange-light text-orange">
                  <FaUserFriends />
                </div>
              </div>
              <p className="kpi-label">Total Pengguna</p>
              <h2 className="kpi-value">85.2k</h2>
            </div>
          </div>

          <div className="chart-row-2">
            <div className="flex-2 chart-dashboard-wrapper">
              <StatistikChart />
            </div>

            <div className="widget-card flex-1">
              <h3 className="widget-title">Distribusi Pendapatan</h3>
              <p className="widget-subtitle mb-20">Pembagian per kategori produk.</p>

              <div className="donut-container">
                <div className="css-donut-chart">
                  <div className="donut-inner">
                    <span className="donut-val">100%</span>
                    <span className="donut-lbl">TOTAL</span>
                  </div>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <span>
                    <FaCircle className="text-purple" /> Hotel
                  </span>
                  <span className="fw-bold">52%</span>
                </div>
                <div className="legend-item">
                  <span>
                    <FaCircle className="text-blue" /> Transport
                  </span>
                  <span className="fw-bold">34%</span>
                </div>
                <div className="legend-item">
                  <span>
                    <FaCircle className="text-yellow" /> Destinasi
                  </span>
                  <span className="fw-bold">14%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: HEATMAP, RANKING, CROWD LEVEL */}
          <div className="chart-row-3">
            {/* Heatmap Destinasi */}
            <div className="widget-card">
              <h3 className="widget-title mb-20">Heatmap Destinasi</h3>
              <div className="css-heatmap">
                <div className="heat-box" style={{ opacity: 0.8 }}></div>
                <div className="heat-box" style={{ opacity: 0.6 }}></div>
                <div className="heat-box" style={{ opacity: 0.4 }}></div>
                <div className="heat-box" style={{ opacity: 0.9 }}></div>
                <div className="heat-box" style={{ opacity: 0.5 }}></div>
                <div className="heat-box" style={{ opacity: 1.0 }}></div>
                <div className="heat-box" style={{ opacity: 0.3 }}></div>
                <div className="heat-box" style={{ opacity: 0.7 }}></div>
                <div className="heat-box" style={{ opacity: 0.2 }}></div>
                <div className="heat-box" style={{ opacity: 0.8 }}></div>
                <div className="heat-box" style={{ opacity: 0.5 }}></div>
                <div className="heat-box" style={{ opacity: 0.9 }}></div>
              </div>
              <div className="heat-legend">
                <span>Kurang Populer</span>
                <span>Paling Populer</span>
              </div>
            </div>

            {/* Ranking Hotel Teratas */}
            <div className="widget-card">
              <h3 className="widget-title mb-20">Ranking Hotel Teratas</h3>
              <div className="ranking-list">
                <div className="ranking-item">
                  <span className="rank-num text-purple">01</span>
                  <div className="rank-info">
                    <h4>Alila Villas Uluwatu</h4>
                    <p>Bali, Indonesia</p>
                  </div>
                  <div className="rank-stats">
                    <h4>Rp 842jt</h4>
                  </div>
                </div>
                <div className="ranking-item">
                  <span className="rank-num text-gray">02</span>
                  <div className="rank-info">
                    <h4>Amanjiwo Borobudur</h4>
                    <p>Magelang, Indonesia</p>
                  </div>
                  <div className="rank-stats">
                    <h4>Rp 650jt</h4>
                  </div>
                </div>
                <div className="ranking-item">
                  <span className="rank-num text-gray">03</span>
                  <div className="rank-info">
                    <h4>The Ritz-Carlton Mega</h4>
                    <p>Jakarta, Indonesia</p>
                  </div>
                  <div className="rank-stats">
                    <h4>Rp 520jt</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistik Crowd Level */}
            <div className="widget-card">
              <h3 className="widget-title mb-20">Statistik Crowd Level</h3>
              <div className="crowd-stats-list">
                <div className="crowd-item">
                  <div className="crowd-header">
                    <span>Bali (Ocean Front)</span>
                    <span className="text-purple fw-bold">85%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill bg-purple" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="crowd-item">
                  <div className="crowd-header">
                    <span>Yogyakarta (Borobudur)</span>
                    <span className="text-yellow fw-bold">62%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill bg-yellow" style={{ width: "62%" }}></div>
                  </div>
                </div>
                <div className="crowd-item">
                  <div className="crowd-header">
                    <span>Lombok (Mandalika)</span>
                    <span className="text-blue-light fw-bold">45%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill bg-blue-light" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: WILAYAH TERAKTIF (MAP PLACEHOLDER) */}
          <div className="widget-card">
            <div className="map-header">
              <div>
                <h3 className="widget-title">Wilayah Teraktif</h3>
                <p className="widget-subtitle">Distribusi volume booking di seluruh wilayah Indonesia.</p>
              </div>
              <div className="map-legend">
                <span>
                  <FaCircle className="text-purple" /> {">"} 1,000 Booking
                </span>
                <span>
                  <FaCircle className="text-purple-light" /> {"<"} 500 Booking
                </span>
              </div>
            </div>

            <div className="map-container">
              {/* Gambar peta dummy dari web */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Indonesia_location_map.svg/1024px-Indonesia_location_map.svg.png" alt="Peta Indonesia" className="map-img" />

              {/* Titik Lokasi Dummy */}
              <div className="map-pin" style={{ top: "55%", left: "30%" }}>
                <div className="pin-dot"></div>
                <div className="pin-label">Jakarta: 4,203 Bookings</div>
              </div>
              <div className="map-pin" style={{ top: "75%", left: "45%" }}>
                <div className="pin-dot"></div>
                <div className="pin-label">Bali: 8,145 Bookings</div>
              </div>

              {/* Analisis Regional Box */}
              <div className="regional-analysis-box">
                <h4>ANALISIS REGIONAL</h4>
                <div className="ra-stats">
                  <div>
                    <h2>64%</h2>
                    <p>JAWA & BALI</p>
                  </div>
                  <div>
                    <h2>22%</h2>
                    <p>SUMATERA</p>
                  </div>
                  <div>
                    <h2>14%</h2>
                    <p>LAINNYA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMonitoringPage;
