import React, { useState } from "react";
import { FaPlus, FaStar, FaEdit, FaTrash, FaFilter, FaChartBar, FaLightbulb } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import "./AdminDestinationPage.css";

interface Destination {
  id: string;
  name: string;
  rating: number;
  location: string;
  category: string;
  price: string;
  crowd: "Sepi" | "Sedang" | "Ramai";
  img: string;
}

const AdminDestinationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua Kategori");
  const [crowdFilter, setCrowdFilter] = useState("Semua Crowd");

  // --- DUMMY DATA ---
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: "1", name: "Raja Ampat", rating: 4.9, location: "Papua Barat", category: "ALAM", price: "Rp 500.000", crowd: "Sepi", img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=150&q=80" },
    {
      id: "2",
      name: "Candi Borobudur",
      rating: 4.8,
      location: "Magelang, Jateng",
      category: "BUDAYA",
      price: "Rp 50.000",
      crowd: "Sedang",
      img: "https://images.unsplash.com/photo-1584814588079-05b1c9c0f993?auto=format&fit=crop&w=150&q=80",
    },
    { id: "3", name: "Pantai Kuta", rating: 4.5, location: "Bali", category: "ALAM", price: "Gratis", crowd: "Ramai", img: "https://images.unsplash.com/photo-1537553170701-44754117b43d?auto=format&fit=crop&w=150&q=80" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Partial<Destination>>({});

  const handleOpenAdd = () => {
    setModalType("add");
    setFormData({ name: "", location: "", category: "ALAM", price: "", crowd: "Sepi", rating: 0, img: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dest: Destination) => {
    setModalType("edit");
    setFormData(dest);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Yakin ingin menghapus destinasi ini?")) {
      setDestinations(destinations.filter((d) => d.id !== id));
    }
  };

  const handleSave = () => {
    if (modalType === "add") {
      const newDest = {
        ...formData,
        id: Date.now().toString(),
        img: formData.img || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80",
      } as Destination;
      setDestinations([...destinations, newDest]);
    } else {
      setDestinations(destinations.map((d) => (d.id === formData.id ? (formData as Destination) : d)));
    }
    setIsModalOpen(false);
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = categoryFilter === "Semua Kategori" || dest.category === categoryFilter;

    const matchCrowd = crowdFilter === "Semua Crowd" || dest.crowd === crowdFilter;

    return matchSearch && matchCategory && matchCrowd;
  });

  const handleResetFilter = () => {
    setSearchQuery("");
    setCategoryFilter("Semua Kategori");
    setCrowdFilter("Semua Crowd");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="destinasi" />

      <main className="admin-main">
        <AdminTopbar showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Cari destinasi..." />

        <div className="dest-content-grid">
          {/* KOLOM KIRI: DAFTAR DESTINASI */}
          <div className="dest-list-section">
            <div className="page-header">
              <div className="title-area">
                <h1>Manajemen Destinasi</h1>
                <p>Kelola data destinasi wisata, kategori, dan pemantauan tingkat kunjungan.</p>
              </div>
              <button className="btn-add-primary" onClick={handleOpenAdd}>
                <FaPlus /> Tambah Destinasi Baru
              </button>
            </div>

            {/* Filter Bar */}
            {/* Filter Bar */}
            <div className="filter-card">
              <div className="filter-left">
                <FaFilter className="text-gray" /> <span className="fw-600 text-dark">FILTER:</span>
                {/* DROPDOWN KATEGORI */}
                <select className="dest-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="Semua Kategori">Semua Kategori</option>
                  <option value="ALAM">Alam</option>
                  <option value="BUDAYA">Budaya</option>
                  <option value="KULINER">Kuliner</option>
                  <option value="HIBURAN">Hiburan</option>
                </select>
                {/* DROPDOWN CROWD LEVEL */}
                <select className="dest-select" value={crowdFilter} onChange={(e) => setCrowdFilter(e.target.value)}>
                  <option value="Semua Crowd">Semua Crowd Level</option>
                  <option value="Sepi">Sepi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Ramai">Ramai</option>
                </select>
              </div>

              {/* TOMBOL RESET FILTER */}
              <button className="btn-reset-filter" onClick={handleResetFilter} style={{ background: "transparent", color: "#4318FF", border: "none", fontWeight: 700, cursor: "pointer" }}>
                Reset Filter
              </button>
            </div>

            {/* Tabel Destinasi */}
            <div className="table-card-container">
              <table className="dest-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nama Destinasi</th>
                    <th>Wilayah</th>
                    <th>Kategori</th>
                    <th>Harga Tiket</th>
                    <th>Crowd Level</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map((dest) => (
                    <tr key={dest.id}>
                      <td>
                        <img src={dest.img} alt={dest.name} className="dest-thumb" />
                      </td>
                      <td>
                        <span className="dest-name">{dest.name}</span>
                        <div className="dest-rating">
                          <FaStar className="text-yellow" /> {dest.rating}
                        </div>
                      </td>
                      <td className="text-gray">{dest.location}</td>
                      <td>
                        <span className="badge-cat">{dest.category}</span>
                      </td>
                      <td className="fw-600 text-dark">{dest.price}</td>
                      <td>
                        <span className={`badge-crowd ${dest.crowd.toLowerCase()}`}>{dest.crowd}</span>
                      </td>
                      <td>
                        <div className="action-icons">
                          <button className="icon-action edit" onClick={() => handleOpenEdit(dest)}>
                            <FaEdit />
                          </button>
                          <button className="icon-action delete" onClick={() => handleDelete(dest.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="table-footer">
                <span className="text-gray">Menampilkan {destinations.length} dari 842 destinasi</span>
                <div className="pagination-controls">
                  <button className="page-btn-text">Sebelumnya</button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn-text">Selanjutnya</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dest-sidebar-section">
            {/* Kartu Ringkasan */}
            <div className="summary-card">
              <div className="summary-header">
                <h3>Ringkasan</h3>
                <FaChartBar className="text-gray" />
              </div>

              <div className="summary-item">
                <p>TOTAL DESTINASI</p>
                <h2>842</h2>
              </div>
              <hr className="summary-divider" />

              <div className="summary-item">
                <p>TERPOPULER</p>
                <h3 className="text-purple">Raja Ampat</h3>
                <span className="text-gray sm-text">Kunjungan: +2.4k/bln</span>
              </div>
              <hr className="summary-divider" />

              <div className="summary-item">
                <p>RATA-RATA RATING</p>
                <h2>
                  4.8<span className="rating-max">/5.0</span> <span className="stars">⭐⭐⭐⭐⭐</span>
                </h2>
              </div>
            </div>

            {/* Kartu Tips Admin */}
            <div className="tips-card">
              <div className="tips-icon">
                <FaLightbulb />
              </div>
              <h4>Tips Admin</h4>
              <p>Pastikan untuk selalu memperbarui status Crowd Level setiap akhir pekan untuk akurasi data pengunjung.</p>
            </div>
          </div>
        </div>

        {/* Floating Action Button (Kanan Bawah) */}
        <button className="fab-add" onClick={handleOpenAdd}>
          <FaPlus />
        </button>
      </main>

      {/* MODAL CRUD */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalType === "add" ? "Tambah Destinasi Baru" : "Edit Destinasi"}</h2>

            <div className="form-group">
              <label>Nama Destinasi</label>
              <input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Wilayah / Lokasi</label>
                <input type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select value={formData.category || "ALAM"} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="ALAM">ALAM</option>
                  <option value="BUDAYA">BUDAYA</option>
                  <option value="KULINER">KULINER</option>
                  <option value="HIBURAN">HIBURAN</option>
                </select>
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Harga Tiket</label>
                <input type="text" value={formData.price || ""} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Cth: Rp 50.000 / Gratis" />
              </div>
              <div className="form-group">
                <label>Crowd Level</label>
                <select value={formData.crowd || "Sepi"} onChange={(e) => setFormData({ ...formData, crowd: e.target.value as any })}>
                  <option value="Sepi">Sepi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Ramai">Ramai</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Rating (0-5)</label>
              <input type="number" step="0.1" value={formData.rating || ""} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} />
            </div>

            <div className="form-group">
              <label>Upload Foto Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({ ...formData, img: URL.createObjectURL(e.target.files[0]) });
                  }
                }}
              />
              {formData.img && (
                <div className="upload-preview">
                  <img src={formData.img} alt="Preview" />
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                Batal
              </button>
              <button className="btn-save" onClick={handleSave}>
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinationPage;
