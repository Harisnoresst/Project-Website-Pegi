import React, { useState } from 'react';
import { 
  FaUserFriends, FaUserCheck, FaUserShield, FaUserPlus, FaFilter 
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import './AdminUserPage.css'; 

// Tipe Data Pengguna
interface User {
  id: string;
  name: string;
  email: string;
  role: 'PELANGGAN' | 'TRAVEL AGENT' | 'ADMIN';
  status: 'Aktif' | 'Menunggu' | 'Nonaktif';
  date: string;
  avatarUrl?: string;
  initials?: string;
}

const AdminUserPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Semua Peran');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // --- DUMMY DATA PENGGUNA ---
  const dummyUsers: User[] = [
    { id: 'PEG-2024-001', name: 'Andi Prasetya', email: 'andi.prasetya@email.com', role: 'PELANGGAN', status: 'Aktif', date: '12 Jan 2024', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    { id: 'PEG-2024-002', name: 'Santi Wijaya', email: 'santi.wijaya@travelgo.id', role: 'TRAVEL AGENT', status: 'Aktif', date: '10 Jan 2024', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 'PEG-2024-003', name: 'Budi Kusuma', email: 'budi.k@pegitravel.com', role: 'ADMIN', status: 'Menunggu', date: '08 Jan 2024', initials: 'BK' },
    { id: 'PEG-2024-004', name: 'Rina Amelia', email: 'rina.amelia@gmail.com', role: 'PELANGGAN', status: 'Nonaktif', date: '05 Jan 2024', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
  ];

  const filteredUsers = dummyUsers.filter(user => {
   const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
   const matchRole = roleFilter === 'Semua Peran' || user.role === roleFilter.toUpperCase();
    
    const matchStatus = statusFilter === 'Semua Status' || user.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  // Fungsi untuk Tombol Reset
  const handleResetFilter = () => {
    setSearchQuery('');
    setRoleFilter('Semua Peran');
    setStatusFilter('Semua Status');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="pengguna" />

      <main className="admin-main">
        <AdminTopbar 
          showSearch={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Cari nama atau email"
        />

        {/* KONTEN UTAMA MANAJEMEN PENGGUNA */}
        <div className="user-management-content">
          
          {/* Header Title & Button */}
          <div className="page-header-flex">
            <div>
              <h1>Manajemen Pengguna</h1>
              <p>Kelola akses, peran, dan status semua pengguna dalam ekosistem Pegi Travel.</p>
            </div>
          </div>

          {/* 4 Kartu Statistik */}
          <div className="stats-grid-4">
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Total Pengguna</p>
                <div className="icon-box bg-purple-light text-purple"><FaUserFriends /></div>
              </div>
              <h2>12,842</h2>
            </div>
            
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Pengguna Aktif</p>
                <div className="icon-box bg-green-light text-green"><FaUserCheck /></div>
              </div>
              <h2>8,910</h2>
            </div>

            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Administrator</p>
                <div className="icon-box bg-yellow-light text-yellow"><FaUserShield /></div>
              </div>
              <h2>24</h2>
            </div>

            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Pengguna Baru</p>
                <div className="icon-box bg-purple-light text-purple"><FaUserPlus /></div>
              </div>
              <h2>342</h2>
            </div>
          </div>

          <div className="table-container-card">
            
            {/* Filter Bar */}
            <div className="filter-bar">
              <div className="filter-left">
                <FaFilter className="text-gray" /> <span className="fw-500">Filter:</span>
                <select 
                  className="filter-select" 
                  value={roleFilter} 
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="Semua Peran">Semua Peran</option>
                  <option value="PELANGGAN">Pelanggan</option>
                  <option value="TRAVEL AGENT">Travel Agent</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <select 
                  className="filter-select" 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Semua Status">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
              <button className="btn-reset-filter" onClick={handleResetFilter}>
                Reset Filter
              </button>
            </div>
            <table className="user-table">
              <thead>
                <tr>
                  <th>PENGGUNA</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>STATUS AKUN</th>
                  <th>REGISTRASI</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="user-cell">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="user-avatar" />
                          ) : (
                            <div className="user-initials bg-yellow-light text-yellow">{user.initials}</div>
                          )}
                          <div className="user-name-group">
                            <span className="fw-bold text-dark">{user.name}</span>
                            <span className="user-id">ID: {user.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray">{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-normal'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="status-cell">
                          <span className={`status-dot ${user.status === 'Aktif' ? 'dot-green' : user.status === 'Menunggu' ? 'dot-yellow' : 'dot-red'}`}></span>
                          <span className={user.status === 'Aktif' ? 'text-green' : user.status === 'Menunggu' ? 'text-yellow' : 'text-red'}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="text-gray">{user.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                      Pencarian "{searchQuery}" tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="pagination-footer">
              <span className="text-gray">Menampilkan 1 - 10 dari 1,284 pengguna</span>
              <div className="pagination-controls">
                <button className="page-btn text-gray">{'<'}</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn">128</button>
                <button className="page-btn text-dark">{'>'}</button>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminUserPage;