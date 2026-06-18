import React from 'react';
import { 
  FaUserCircle, FaHistory, FaHeart, FaUsers, FaArrowLeft, 
  FaMapMarkerAlt, FaCompass 
} from 'react-icons/fa';
import './WishlistPage.css';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';

interface WishlistItem {
  id: string;
  category: string;
  title: string;
  location: string;
  imageUrl: string;
  badgeColor: string;
}

const WishlistPage: React.FC = () => {
  const wishlistItems: WishlistItem[] = [
    {
      id: '1',
      category: 'Hotel Mewah',
      title: 'Plataran Heritage Borobudur',
      location: 'Magelang, Jawa Tengah',
      imageUrl: 'https://animehunch.com/wp-content/uploads/2023/01/Asa-Mitaka.jpg',
      badgeColor: '#8b5cf6' 
    },
    {
      id: '2',
      category: 'Luxury Train',
      title: 'KAI Taksaka Luxury Train',
      location: 'Jakarta - Yogyakarta',
      imageUrl: 'https://animehunch.com/wp-content/uploads/2023/01/Asa-Mitaka.jpg',
      badgeColor: '#3b82f6' 
    },
    {
      id: '3',
      category: 'Wisata Budaya',
      title: 'Taman Sari Water Castle',
      location: 'Yogyakarta, D.I.Y',
      imageUrl: 'https://animehunch.com/wp-content/uploads/2023/01/Asa-Mitaka.jpg',
      badgeColor: '#f59e0b' 
    }
  ];

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-subtitle">WORKSPACE</span>
          <h2 className="sidebar-title">Traveler Area</h2>
        </div>
        
        <nav className="sidebar-nav">
          <a href="/profile" className="nav-item">
            <FaUserCircle className="nav-icon" /> Profil Saya
          </a>
          <a href="/history" className="nav-item">
            <FaHistory className="nav-icon" /> Riwayat Booking
          </a>
          <a href="/wishlist" className="nav-item active">
            <FaHeart className="nav-icon" /> Wishlist Saya
          </a>
          <a href="grup" className="nav-item">
            <FaUsers className="nav-icon" /> Grup Perjalanan Saya
          </a>
        </nav>

        <button className="btn-back">
          <FaArrowLeft /> Kembali ke Beranda
        </button>
      </aside>

      <main className="profile-main">
        <div className="main-container">
          
          <header className="main-header">
            <h1>Wishlist Saya</h1>
            <p>Temukan kembali tempat dan transportasi impian Anda.</p>
          </header>

          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-card">
                <div className="wishlist-image-wrapper">
                  <img src={item.imageUrl} alt={item.title} />
                  <div className="heart-icon-badge">
                    <FaHeart />
                  </div>
                  <span className="category-tag" style={{ backgroundColor: item.badgeColor }}>
                    {item.category}
                  </span>
                </div>
                
                <div className="wishlist-content">
                  <h3 className="wishlist-title">{item.title}</h3>
                  <p className="wishlist-location">
                    <FaMapMarkerAlt className="icon-marker" /> {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="explore-prompt">
            <div className="prompt-icon">
              <FaCompass />
            </div>
            <h3>Ingin menambah destinasi lain?</h3>
            <p>
              Jelajahi ribuan pilihan hotel, transportasi darat, dan tempat 
              wisata menarik lainnya di seluruh Indonesia.
            </p>
            <button className="btn-explore">Eksplor Sekarang</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WishlistPage;