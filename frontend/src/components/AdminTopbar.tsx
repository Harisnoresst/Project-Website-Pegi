import React from 'react';
import { FaSearch, FaBell, FaQuestionCircle, FaCog } from 'react-icons/fa';
import './AdminTopbar.css';

// Definisi Jenis Props agar komponen bisa menerima data luar
interface AdminTopbarProps {
  showSearch?: boolean; // Mengatur apakah search bar mau dimunculkan atau tidak
  searchQuery?: string; // Nilai ketikan pencarian
  setSearchQuery?: (value: string) => void; // Fungsi untuk mengubah nilai ketikan
  placeholder?: string; // Teks penanda di dalam kotak input
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({
  showSearch = false,
  searchQuery = '',
  setSearchQuery,
  placeholder = 'Cari...'
}) => {
  return (
    <header className="admin-topbar">
      
      {/* Kondisi: Jika showSearch bernilai true, kotak pencarian akan muncul */}
      {showSearch ? (
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>
      ) : (
        /* Jika showSearch false, div kosong ini akan mendorong ikon ke kanan */
        <div className="topbar-left-spacer"></div>
      )}

      {/* Bagian Kanan: Notifikasi & Profil */}
      <div className="topbar-actions">
        <div className="topbar-icons">
          <button className="icon-btn"><FaBell /></button>
          <button className="icon-btn"><FaQuestionCircle /></button>
          <button className="icon-btn"><FaCog /></button>
        </div>
        
        <div className="topbar-divider"></div>
        
        <div className="admin-profile">
          <div className="admin-info">
            <span className="admin-name">Admin Pegi</span>
            <span className="admin-role">ADMIN</span>
          </div>
          <img src="https://i.pravatar.cc/150?img=3" alt="Admin" className="admin-avatar" />
        </div>
      </div>

    </header>
  );
};

export default AdminTopbar;