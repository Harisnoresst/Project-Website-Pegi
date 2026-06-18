import React, { useState } from "react";
import { FaPlus, FaStar, FaMapMarkerAlt, FaUtensils, FaSwimmingPool, FaSpa, FaEdit, FaTrash } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import "./AdminHotelPage.css";

interface RoomType {
  id: string;
  name: string;
  bed: string;
  price: number;
}

interface Hotel {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  rooms: number;
  img: string;
  gallery?: string[];
  description?: string;
  roomTypes?: RoomType[];
}

const AdminHotelPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  

  // Data State (Bisa diubah/dihapus)
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: "1", name: "The Grand Oasis Resort", category: "Luxury Resort", location: "Uluwatu, Bali", rating: 4.9, rooms: 450, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=300&q=80" },
    { id: "2", name: "Heritage Mansion Hotel", category: "Heritage Style", location: "Menteng, Jakarta", rating: 4.7, rooms: 120, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80" },
    { id: "3", name: "Skyline Boutique Stay", category: "Boutique Hotel", location: "Lembang, Bandung", rating: 4.5, rooms: 85, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=300&q=80" },
    { id: "4", name: "Azure Bay Villas", category: "Private Villa", location: "Seminyak, Bali", rating: 4.8, rooms: 45, img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80" },
  ]);

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State untuk Preview & Modal
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(hotels[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Partial<Hotel>>({});

  // Buka Modal Tambah Data
  const handleOpenAdd = () => {
    setModalType("add");
    setFormData({
      name: "",
      category: "",
      location: "",
      rooms: 0,
      rating: 0,
      img: "",
      gallery: [],
      description: "",
      roomTypes: [],
    });
    setIsModalOpen(true);
  };

  // Fungsi khusus untuk menambah baris Tipe Kamar baru di dalam Modal
  const handleAddRoomType = () => {
    const newRoom: RoomType = { id: Date.now().toString(), name: "", bed: "", price: 0 };
    setFormData({
      ...formData,
      roomTypes: [...(formData.roomTypes || []), newRoom],
    });
  };

  // Fungsi untuk mengubah isi dari baris Tipe Kamar tertentu
  const handleRoomTypeChange = (id: string, field: keyof RoomType, value: any) => {
    const updatedRooms = formData.roomTypes?.map((room) => (room.id === id ? { ...room, [field]: value } : room));
    setFormData({ ...formData, roomTypes: updatedRooms });
  };

  // Fungsi untuk menghapus baris Tipe Kamar
  const handleRemoveRoomType = (id: string) => {
    const updatedRooms = formData.roomTypes?.filter((room) => room.id !== id);
    setFormData({ ...formData, roomTypes: updatedRooms });
  };

  // Buka Modal Edit Data
  const handleOpenEdit = (hotel: Hotel, e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah baris terpilih saat klik tombol edit
    setModalType("edit");
    setFormData(hotel);
    setIsModalOpen(true);
  };

  // Fungsi Hapus Data
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Apakah Anda yakin ingin menghapus hotel ini?")) {
      const updatedHotels = hotels.filter((h) => h.id !== id);
      setHotels(updatedHotels);
      if (selectedHotel.id === id && updatedHotels.length > 0) setSelectedHotel(updatedHotels[0]);
    }
  };

  // Fungsi Simpan (Dari Modal)
  const handleSave = () => {
    if (modalType === "add") {
      const newHotel = { ...formData, id: Date.now().toString(), img: "https://images.unsplash.com/photo-1551882547-ff40c0d51c1f?auto=format&fit=crop&w=300&q=80" } as Hotel;
      setHotels([...hotels, newHotel]);
    } else {
      setHotels(hotels.map((h) => (h.id === formData.id ? (formData as Hotel) : h)));
      if (selectedHotel.id === formData.id) setSelectedHotel(formData as Hotel);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="hotel" />

      <main className="admin-main">
        <AdminTopbar showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Cari nama hotel..." />

        <div className="hotel-content-grid">
          {/* KOLOM KIRI: DAFTAR HOTEL */}
          <div className="hotel-list-section">
            <div className="page-header">
              <div className="title-area">
                <h1>Manajemen Hotel</h1>
                <p>Kelola daftar properti, ketersediaan, dan informasi detail hotel.</p>
              </div>
              <button className="btn-add-hotel" onClick={handleOpenAdd}>
                <FaPlus /> Tambah Hotel Baru
              </button>
            </div>

            <div className="table-card-container">
              <table className="hotel-table">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Lokasi</th>
                    <th>Rating</th>
                    <th>Kamar</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                {filteredHotels.map((hotel) => (
                    <tr 
                    key={hotel.id} 
                    className={selectedHotel?.id === hotel.id ? 'active-row' : ''}
                    onClick={() => setSelectedHotel(hotel)}
                    >
                      <td>
                        <div className="hotel-cell">
                          <img src={hotel.img} alt={hotel.name} />
                          <div className="hotel-info">
                            <span className="hotel-name">{hotel.name}</span>
                            <span className="hotel-cat">{hotel.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray">{hotel.location}</td>
                      <td>
                        <div className="rating-cell">
                          <FaStar className="text-yellow" /> {hotel.rating}
                        </div>
                      </td>
                      <td className="fw-bold text-dark">{hotel.rooms}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon edit" onClick={(e) => handleOpenEdit(hotel, e)}>
                            <FaEdit />
                          </button>
                          <button className="btn-icon delete" onClick={(e) => handleDelete(hotel.id, e)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <span className="text-gray">
                  Menampilkan 1-{hotels.length} dari {hotels.length} hotel
                </span>
                <div className="pagination-controls">
                  <button className="page-btn text-gray">{"<"}</button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn text-dark">{">"}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="hotel-preview-section">
            <div className="preview-header">
              <h3>Pratinjau Hotel</h3>
              <span className="live-badge">LIVE PREVIEW</span>
            </div>

            <div className="preview-card">
              <div className="preview-image-container">
                <img src={selectedHotel.img} alt="Detail" />
                <div className="rating-float">
                  <FaStar /> {selectedHotel.rating}
                </div>
              </div>

              <div className="preview-body">
                <h2 className="preview-title">{selectedHotel.name}</h2>
                <p className="preview-loc">
                  <FaMapMarkerAlt /> {selectedHotel.location} • 2.4k ulasan
                </p>
                <p className="preview-desc">Resor mewah tepi pantai dengan pemandangan menakjubkan. Terkenal dengan arsitektur modern tropis yang ikonik.</p>

                <div className="preview-stats-grid">
                  <div className="p-stat">
                    <span>{selectedHotel.rooms}</span>
                    <label>KAMAR</label>
                  </div>
                  <div className="p-stat">
                    <span>12</span>
                    <label>TIPE</label>
                  </div>
                  <div className="p-stat">
                    <span>3</span>
                    <label>RESTO</label>
                  </div>
                </div>

                <div className="preview-tags">
                  <span className="tag">
                    <FaSwimmingPool /> Kolam Renang
                  </span>
                  <span className="tag">
                    <FaSpa /> Spa & Wellness
                  </span>
                  <span className="tag">
                    <FaUtensils /> Fine Dining
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content modal-large">
            <h2>{modalType === "add" ? "Tambah Hotel Baru" : "Edit Hotel"}</h2>

            <div className="modal-scroll-area">
              <h3 className="section-title">Informasi Dasar</h3>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Nama Hotel</label>
                  <input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Cth: Ubud Hanging Gardens" />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <input type="text" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Cth: Luxury Resort" />
                </div>
              </div>

              <div className="form-group">
                <label>Lokasi Lengkap</label>
                <input type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Cth: Banjar Susut, Payangan, Gianyar, Bali" />
              </div>

              <div className="form-group">
                <label>Tentang Akomodasi (Deskripsi)</label>
                <textarea rows={4} value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Ceritakan keunikan dan fasilitas utama hotel ini..."></textarea>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Jumlah Kamar Total</label>
                  <input type="number" value={formData.rooms || ""} onChange={(e) => setFormData({ ...formData, rooms: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Rating Awal</label>
                  <input type="number" step="0.1" value={formData.rating || ""} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} />
                </div>
              </div>

              <hr className="modal-divider" />

              <h3 className="section-title">Media & Foto</h3>
              <div className="form-group-row">
                {/* Thumbnail Utama */}
                <div className="form-group">
                  <label>Thumbnail Utama (1 Foto)</label>
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
                      <img src={formData.img} alt="Thumbnail" />
                    </div>
                  )}
                </div>

                {/* Galeri Detail */}
                <div className="form-group">
                  <label>Galeri Hotel (Bisa Pilih Banyak)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="file-input"
                    onChange={(e) => {
                      if (e.target.files) {
                        const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                        setFormData({ ...formData, gallery: [...(formData.gallery || []), ...newImages] });
                      }
                    }}
                  />
                  {formData.gallery && formData.gallery.length > 0 && (
                    <div className="gallery-preview-grid">
                      {formData.gallery.map((img, idx) => (
                        <div key={idx} className="g-preview-item">
                          <img src={img} alt={`Gallery ${idx}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <hr className="modal-divider" />

              <div className="section-header-flex">
                <h3 className="section-title">Tipe Kamar & Harga</h3>
                <button className="btn-add-sm" onClick={handleAddRoomType}>
                  + Tambah Tipe Kamar
                </button>
              </div>

              {formData.roomTypes && formData.roomTypes.length === 0 ? (
                <p className="empty-text">Belum ada tipe kamar yang ditambahkan.</p>
              ) : (
                <div className="room-types-list">
                    {formData.roomTypes?.map((room) => (
                        <div key={room.id} className="room-type-row">
                      <div className="form-group">
                        <label>Nama Tipe Kamar</label>
                        <input type="text" value={room.name} onChange={(e) => handleRoomTypeChange(room.id, "name", e.target.value)} placeholder="Cth: Deluxe King Room" />
                      </div>
                      <div className="form-group">
                        <label>Pilihan Tempat Tidur</label>
                        <input type="text" value={room.bed} onChange={(e) => handleRoomTypeChange(room.id, "bed", e.target.value)} placeholder="Cth: 1 King Bed" />
                      </div>
                      <div className="form-group">
                        <label>Harga / Malam (Rp)</label>
                        <input type="number" value={room.price || ""} onChange={(e) => handleRoomTypeChange(room.id, "price", Number(e.target.value))} placeholder="Cth: 4250000" />
                      </div>
                      <button className="btn-remove-row" onClick={() => handleRemoveRoomType(room.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  ))}
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

export default AdminHotelPage;
