import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import "./AdminPaymentPage.css";
import {useTransaction } from "../context/TransactionContext";

interface Transaction {
  id: string;
  txId: string;
  customerName: string;
  serviceType: "Hotel" | "Destinasi" | "Transportasi" | "Grup Wisata";
  serviceName: string;
  amount: string;
  date: string;
  status: "Menunggu" | "Berhasil" | "Ditolak";
  proofImg: string;
  isSplitBill?: boolean;
  totalGroupBill?: string;
  splitCount?: number;
}

const AdminPaymentPage: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [typeFilter, setTypeFilter] = useState("Semua Layanan");
  const { transactions, setTransactions } = useTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleOpenProof = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  const handleApprove = (id: string) => {
    if (window.confirm("Terima pembayaran ini? Transaksi akan berstatus Berhasil.")) {
      setTransactions(transactions.map((t) => (t.id === id ? { ...t, status: "Berhasil" } : t)));
      setIsModalOpen(false);
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm("Tolak pembayaran ini? Pelanggan akan diminta mengunggah ulang bukti transfer.")) {
      setTransactions(transactions.map((t) => (t.id === id ? { ...t, status: "Ditolak" } : t)));
      setIsModalOpen(false);
    }
  };

  // Filter Logika
  const filteredTx = transactions.filter((t) => {
    const matchSearch = t.customerName.toLowerCase().includes(globalSearch.toLowerCase()) || t.txId.toLowerCase().includes(globalSearch.toLowerCase());
    const matchStatus = statusFilter === "Semua Status" || t.status === statusFilter;
    const matchType = typeFilter === "Semua Layanan" || t.serviceType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="pembayaran" /> 
      <main className="admin-main">
        <AdminTopbar showSearch={true} searchQuery={globalSearch} setSearchQuery={setGlobalSearch} placeholder="Cari ID Transaksi atau Nama..." />

        <div className="payment-container">
          <div className="page-header">
            <div className="title-area">
              <h1>Verifikasi Pembayaran</h1>
              <p>Cek dan validasi bukti transfer pelanggan untuk seluruh layanan Pegi Travel.</p>
            </div>
          </div>

          <div className="stats-grid-payment">
            <div className="stat-card">
              <div className="stat-icon bg-orange-light">
                <FaClock />
              </div>
              <div className="stat-info">
                <p>Menunggu Konfirmasi</p>
                <h3>{transactions.filter((t) => t.status === "Menunggu").length}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green-light">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <p>Pembayaran Berhasil</p>
                <h3>{transactions.filter((t) => t.status === "Berhasil").length}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-red-light">
                <FaTimesCircle />
              </div>
              <div className="stat-info">
                <p>Pembayaran Ditolak</p>
                <h3>{transactions.filter((t) => t.status === "Ditolak").length}</h3>
              </div>
            </div>
          </div>

          <div className="filter-bar">
            <span className="text-gray fw-bold">Filter:</span>
            <select className="select-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="Semua Status">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Ditolak">Ditolak</option>
            </select>
            <select className="select-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="Semua Layanan">Semua Layanan</option>
              <option value="Hotel">Hotel</option>
              <option value="Destinasi">Destinasi</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Grup Wisata">Grup Wisata</option>
            </select>
          </div>

          <div className="table-card-container">
            <div className="table-responsive-wrapper">
              <div className="table-scroll-content">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID TRANSAKSI</th>
                      <th>PELANGGAN</th>
                      <th>DETAIL LAYANAN</th>
                      <th>TOTAL BAYAR</th>
                      <th>TANGGAL</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTx.map((tx) => (
                      <tr key={tx.id}>
                        <td>
                          <span className="tx-id">{tx.txId}</span>
                        </td>
                        <td className="fw-bold text-dark">{tx.customerName}</td>
                        <td>
                          <span className="fw-bold text-dark d-block">{tx.serviceName}</span>
                          <span className="text-gray sm-text">{tx.serviceType}</span>
                        </td>
                        <td className="fw-bold text-dark">{tx.amount}
                            {tx.isSplitBill && (
                            <span className="text-orange sm-text fw-bold">💳 Split Bill (1/{tx.splitCount})</span>
                          )}
                        </td>
                        <td className="text-gray sm-text">{tx.date}</td>
                        <td>
                          <span className={`badge-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                        </td>
                        <td>
                          <div className="action-icons">
                            <button className="icon-btn view" onClick={() => handleOpenProof(tx)} title="Lihat Bukti">
                              <FaEye />
                            </button>
                            {/* Tombol aksi hanya muncul jika status masih Menunggu */}
                            {tx.status === "Menunggu" && (
                              <>
                                <button className="icon-btn approve" onClick={() => handleApprove(tx.id)} title="Terima">
                                  <FaCheck />
                                </button>
                                <button className="icon-btn reject" onClick={() => handleReject(tx.id)} title="Tolak">
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="table-footer">
                  <span className="text-gray sm-text">
                    Menampilkan 1-{filteredTx.length} dari {transactions.length} transaksi
                  </span>
                  <div className="pagination-controls">
                    <button className="page-btn">{"<"}</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">{">"}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* MODAL LIHAT BUKTI */}
      {isModalOpen && selectedTx && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Bukti Pembayaran</h2>

            <div className="proof-image-container">
              <img src={selectedTx.proofImg} alt="Bukti Transfer" />
            </div>

            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">ID Transaksi</span>
                <span className="detail-value tx-id">{selectedTx.txId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pelanggan</span>
                <span className="detail-value">{selectedTx.customerName}</span>
              </div>
              {selectedTx.isSplitBill && (
                <>
                  <div className="detail-row">
                    <span className="detail-label">Metode Pembayaran</span>
                    <span className="detail-value text-orange">Split Bill ({selectedTx.splitCount} Orang)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Tagihan Grup</span>
                    <span className="detail-value">{selectedTx.totalGroupBill}</span>
                  </div>
                </>
              )}
              <div className="detail-row">
                <span className="detail-label">
                  {selectedTx.isSplitBill ? 'Porsi Dibayar (Orang Ini)' : 'Total Dibayar'}
                </span>
                <span className="detail-value fw-bold">{selectedTx.amount}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                Tutup
              </button>

              {/* Jika masih menunggu, admin bisa langsung verifikasi dari dalam modal */}
              {selectedTx.status === "Menunggu" && (
                <>
                  <button className="btn-reject" onClick={() => handleReject(selectedTx.id)}>
                    Tolak
                  </button>
                  <button className="btn-approve" onClick={() => handleApprove(selectedTx.id)}>
                    Verifikasi Diterima
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentPage;
