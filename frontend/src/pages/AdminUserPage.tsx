import React, { useState, useEffect } from "react";
import { FaUserFriends, FaUserCheck, FaUserShield, FaUserPlus, FaFilter, FaBan, FaCheckCircle } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import "./AdminUserPage.css";

// 1. Import Service API untuk Pengguna
import { getAllUsers, updateUser } from "../services/adminService";

// Tipe Data Pengguna
interface User {
  id: string;
  name: string;
  email: string;
  role: "PELANGGAN" | "TRAVEL AGENT" | "ADMIN";
  status: "Aktif" | "Nonaktif";
  date: string;
  avatarUrl?: string;
  initials?: string;
}

const AdminUserPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua Peran");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // 2. State Data dari Database
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE UNTUK PAGINATION (BARU) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Batasan 5 data per halaman

  // 3. Fungsi untuk menarik data dari Database
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 4. Perbarui fungsi Ubah Status
  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const isDeactivating = currentStatus === "Aktif";
    const confirmMsg = isDeactivating ? "Apakah Anda yakin ingin MENONAKTIFKAN pengguna ini? Mereka tidak akan bisa login." : "Apakah Anda yakin ingin MENGAKTIFKAN KEMBALI pengguna ini?";

    if (window.confirm(confirmMsg)) {
      try {
        const newStatus = isDeactivating ? "Nonaktif" : "Aktif";
        await updateUser(userId, { status: newStatus });
        fetchUsers();
      } catch (error) {
        alert("Terjadi kesalahan saat mengubah status pengguna.");
      }
    }
  };

  // Filter Data
  const filteredUsers = users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === "Semua Peran" || user.role === roleFilter.toUpperCase();
    const matchStatus = statusFilter === "Semua Status" || user.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  // --- LOGIKA PAGINATION (BARU) ---
  // Reset halaman ke 1 jika Admin mengetik pencarian atau mengubah filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Memotong data yang tampil sesuai halaman saat ini
  const currentTableData = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilter = () => {
    setSearchQuery("");
    setRoleFilter("Semua Peran");
    setStatusFilter("Semua Status");
  };

  // Hitung statistik dinamis
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Aktif").length;
  const adminUsers = users.filter((u) => u.role === "ADMIN").length;

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="pengguna" />

      <main className="admin-main">
        <AdminTopbar showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Cari nama atau email" />

        <div className="user-management-content">
          <div className="page-header-flex">
            <div>
              <h1>Manajemen Pengguna</h1>
              <p>Kelola akses, peran, dan status semua pengguna dalam ekosistem Pegi Travel.</p>
            </div>
          </div>

          <div className="stats-grid-4">
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Total Pengguna</p>
                <div className="icon-box bg-purple-light text-purple">
                  <FaUserFriends />
                </div>
              </div>
              <h2>{totalUsers.toLocaleString("id-ID")}</h2>
            </div>
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Pengguna Aktif</p>
                <div className="icon-box bg-green-light text-green">
                  <FaUserCheck />
                </div>
              </div>
              <h2>{activeUsers.toLocaleString("id-ID")}</h2>
            </div>
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Administrator</p>
                <div className="icon-box bg-yellow-light text-yellow">
                  <FaUserShield />
                </div>
              </div>
              <h2>{adminUsers.toLocaleString("id-ID")}</h2>
            </div>
            <div className="stat-card-white">
              <div className="stat-card-header">
                <p>Pengguna Baru</p>
                <div className="icon-box bg-purple-light text-purple">
                  <FaUserPlus />
                </div>
              </div>
              <h2>...</h2>
            </div>
          </div>

          <div className="filter-bar">
            <div className="filter-left">
              <FaFilter className="text-gray" /> <span className="fw-500">Filter:</span>
              <select className="filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="Semua Peran">Semua Peran</option>
                <option value="PELANGGAN">Pelanggan</option>
                <option value="TRAVEL AGENT">Travel Agent</option>
                <option value="ADMIN">Admin</option>
              </select>
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
            <button className="btn-reset-filter" onClick={handleResetFilter}>
              Reset Filter
            </button>
          </div>

          <div className="table-container-card">
            <div className="table-responsive-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>PENGGUNA</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>STATUS AKUN</th>
                    <th>REGISTRASI</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                        Memuat data pengguna dari database...
                      </td>
                    </tr>
                  ) : currentTableData.length > 0 ? (
                    currentTableData.map((user, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="user-cell">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt={user.name} className="user-avatar" />
                            ) : (
                              <div className="user-initials bg-yellow-light text-yellow">{user.initials || user.name.substring(0, 2).toUpperCase()}</div>
                            )}
                            <div className="user-name-group">
                              <span className="fw-bold text-dark">{user.name}</span>
                              <span className="user-id">ID: {user.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-gray">{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role === "ADMIN" ? "role-admin" : "role-normal"}`}>{user.role}</span>
                        </td>
                        <td>
                          <div className="status-cell">
                            <span className={`status-dot ${user.status === "Aktif" ? "dot-green" : "dot-red"}`}></span>
                            <span className={user.status === "Aktif" ? "text-green" : "text-red"}>{user.status}</span>
                          </div>
                        </td>
                        <td className="text-gray">{user.date}</td>

                        {/* --- TOMBOL AKSI --- */}
                        <td>
                          {user.status === "Aktif" && (
                            <button className="btn-action btn-danger" onClick={() => handleToggleStatus(user.id, user.status)}>
                              <FaBan /> Nonaktifkan
                            </button>
                          )}

                          {user.status === "Nonaktif" && (
                            <button className="btn-action btn-success" onClick={() => handleToggleStatus(user.id, user.status)}>
                              <FaCheckCircle /> Aktifkan
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                        Pencarian "{searchQuery}" tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* --- PAGINATION FOOTER DINAMIS --- */}
            <div className="pagination-footer">
              <span className="text-gray">
                Menampilkan halaman {currentPage} dari {totalPages || 1} ({filteredUsers.length} total pengguna)
              </span>

              <div className="pagination-controls">
                <button
                  className="page-btn text-gray"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  {"<"}
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button key={index + 1} className={`page-btn ${currentPage === index + 1 ? "active" : ""}`} onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                ))}

                <button
                  className="page-btn text-dark"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  style={{ cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer", opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserPage;
