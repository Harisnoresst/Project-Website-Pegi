import React, { useState, useEffect } from 'react';
import { 
  FaUserCircle, FaHistory, FaHeart, FaUsers, FaArrowLeft, 
  FaBuilding, FaTrain, FaTicketAlt, FaBus, FaCalendarAlt, 
  FaStar, FaChair, FaUserFriends, FaMapMarkerAlt, FaChevronDown
} from 'react-icons/fa';
import './BookingHistoryPage.css';
import type { BookingItem } from '../types/BookingType';
import { getBookings } from '../services/bookingService';

const BookingHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch data dari database
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 2. Helper untuk render Icon Kategori Dinamis
  const getCategoryIcon = (category: string, title: string) => {
    if (category === 'Hotel') return <FaBuilding />;
    if (category === 'Tiket Wisata') return <FaTicketAlt />;
    if (category === 'Transportasi') {
      // Cek apakah transportasinya bus atau kereta dari judulnya
      if (title.toLowerCase().includes('kereta') || title.toLowerCase().includes('taksaka')) return <FaTrain />;
      return <FaBus />; 
    }
    return <FaTicketAlt />;
  };

  // 3. Helper untuk render Icon Ekstra Dinamis (Rating/Kursi/Orang)
  const getExtraIcon = (category: string) => {
    if (category === 'Hotel') return <FaStar className="text-yellow" />;
    if (category === 'Transportasi') return <FaChair />;
    if (category === 'Tiket Wisata') return <FaUserFriends />;
    return <FaMapMarkerAlt />;
  };

  // Fungsi Filter Tab Data
  const filteredBookings = activeTab === 'Semua' 
    ? bookings 
    : bookings.filter(b => b.category === activeTab);

  return (
    <div className="profile-layout">
      {/* SIDEBAR KIRI */}
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-subtitle">WORKSPACE</span>
          <h2 className="sidebar-title">Traveler Area</h2>
        </div>
        
        <nav className="sidebar-nav">
          <a href="/profile" className="nav-item">
            <FaUserCircle className="nav-icon" /> Profil Saya
          </a>
          <a href="/history" className="nav-item active">
            <FaHistory className="nav-icon" /> Riwayat Booking
          </a>
          <a href="/wishlist" className="nav-item">
            <FaHeart className="nav-icon" /> Wishlist Saya
          </a>
          <a href="/grup" className="nav-item">
            <FaUsers className="nav-icon" /> Grup Perjalanan Saya
          </a>
        </nav>

        <button className="btn-back">
          <FaArrowLeft /> Kembali ke Beranda
        </button>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="profile-main">
        <div className="main-container">
          
          <header className="main-header">
            <h1>Riwayat Booking</h1>
            <p>Pantau status perjalanan dan transaksi Anda.</p>
          </header>

          {/* Tab Filter */}
          <div className="filter-tabs">
            {['Semua', 'Hotel', 'Transportasi', 'Tiket Wisata'].map(tab => (
              <button 
                key={tab} 
                className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Kondisi Loading / Data Kosong */}
          {isLoading ? (
             <p style={{ color: '#8f9bba', marginTop: '20px', fontWeight: 'bold' }}>Memuat riwayat booking Anda...</p>
          ) : filteredBookings.length === 0 ? (
             <p style={{ color: '#8f9bba', marginTop: '20px' }}>Tidak ada riwayat booking untuk kategori ini.</p>
          ) : (
            <>
              {/* List Booking */}
              <div className="booking-list">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    
                    {/* Gambar */}
                    <div className="booking-image">
                      <img src={booking.imageUrl} alt={booking.title} />
                    </div>

                    {/* Detail Tengah */}
                    <div className="booking-info">
                      <div className="info-header">
                        <span className="category-label">
                          {getCategoryIcon(booking.category, booking.title)} {booking.category.toUpperCase()}
                        </span>
                        <span className={`status-badge ${booking.status === 'Selesai' ? 'badge-green' : 'badge-yellow'}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <h3 className="booking-title">{booking.title}</h3>
                      <p className="booking-id">ID: {booking.bookingId}</p>
                      
                      <div className="info-footer">
                        <span className="info-item">
                          <FaCalendarAlt className="icon-grey" /> {booking.date}
                        </span>
                        <span className="info-item">
                          {getExtraIcon(booking.category)} {booking.extraText}
                        </span>
                      </div>
                    </div>

                    {/* Harga dan Aksi Kanan */}
                    <div className="booking-action">
                      <div className="price-wrapper">
                        <p className="price-label">Total Pembayaran</p>
                        <p className="price-value">{booking.totalPrice}</p>
                      </div>
                      <button className="btn-action">{booking.buttonText}</button>
                    </div>
                    
                  </div>
                ))}
              </div>

              {/* Tombol Load More */}
              {filteredBookings.length > 0 && (
                <div className="load-more-container">
                  <button className="btn-load-more">
                    Tampilkan Lebih Banyak <FaChevronDown />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default BookingHistoryPage;