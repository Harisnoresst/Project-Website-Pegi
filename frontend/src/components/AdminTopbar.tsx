import React from 'react';
import { FaSearch, FaBell, FaQuestionCircle, FaCog } from 'react-icons/fa';
import './AdminTopbar.css';

// Definisi Jenis Props agar komponen bisa menerima data luar
interface AdminTopbarProps {
  showSearch?: boolean; 
  searchQuery?: string; 
  setSearchQuery?: (value: string) => void; 
  placeholder?: string; 
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({
  showSearch = false,
  searchQuery = '',
  setSearchQuery,
  placeholder = 'Cari...'
}) => {
  return (
    <header className="admin-topbar">
      
     
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
       
        <div className="topbar-left-spacer"></div>
      )}

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