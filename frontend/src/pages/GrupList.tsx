import React, { useState, useEffect } from "react";
import { FaStar, FaPlus, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers} from "react-icons/fa";
import "./GrupList.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TravelerSidebar from "../components/TravelerSidebar";

interface TravelGroup {
  id: number | string;
  title: string;
  status: string;
  statusColor: string;
  location: string;
  date: string;
  members: number;
  img: string;
}

// 1. DATA DUMMY UTAMA
const dummyGroups: TravelGroup[] = [
  {
    id: 3,
    title: "Outing Kantor Lembang",
    status: "Mendatang",
    statusColor: "#4318FF",
    location: "Lembang, Bandung",
    date: "15 - 17 Nov 2024",
    members: 24,
    img: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Wisata Budaya Jogja",
    status: "Selesai",
    statusColor: "#8F9BBA",
    location: "Magelang, Jateng",
    date: "05 - 08 Sep 2024",
    members: 6,
    img: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 1,
    title: "Reuni Akrab Bali",
    status: "Aktif",
    statusColor: "#E58E00",
    location: "Ubud, Bali",
    date: "12 - 18 Okt 2024",
    members: 12,
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
  },
];

// 2. DATA DUMMY HIGHLIGHT & LOYALTY
const dummyHighlight = {
  title: "Petualangan Bromo 2024",
  status: "Status Aktif",
  countdown: 4,
  location: "Probolinggo, Jatim",
  img: "https://images.unsplash.com/photo-1602154562092-23f2f099080c?auto=format&fit=crop&w=300&q=80",
  avatars: ["https://i.pravatar.cc/150?img=32", "https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=53"],
  extraMembers: 5,
};

const dummyLoyalty = {
  points: "12,450",
  message: "Anda memiliki grup terbanyak bulan ini!",
};

const GrupList: React.FC = () => {
  const [groups, setGroups] = useState<TravelGroup[]>([]);

  // STATE BARU UNTUK HIGHLIGHT & LOYALTY
  const [highlight, setHighlight] = useState(dummyHighlight);
  const [loyalty, setLoyalty] = useState(dummyLoyalty);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("terbaru");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<TravelGroup>>({});

  // 3. FUNGSI UNTUK MENARIK SEMUA DATA DARI DATABASE
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // A. Tarik Data List Grup
        const resGroups = await fetch("http://localhost:5000/api/groups");
        if (resGroups.ok) {
          const dataGroups = await resGroups.json();
          setGroups(dataGroups.length > 0 ? dataGroups : dummyGroups);
        } else {
          setGroups(dummyGroups);
        }

        // B. Tarik Data Highlight (Grup Terdekat)
        const resHighlight = await fetch("http://localhost:5000/api/groups/highlight");
        if (resHighlight.ok) {
          const dataHighlight = await resHighlight.json();
          if (dataHighlight) setHighlight(dataHighlight);
        }

        // C. Tarik Data Loyalty Points User
        const resLoyalty = await fetch("http://localhost:5000/api/user/loyalty");
        if (resLoyalty.ok) {
          const dataLoyalty = await resLoyalty.json();
          if (dataLoyalty) setLoyalty(dataLoyalty);
        }
      } catch (error) {
        console.warn("Database belum terhubung, beralih ke mode Dummy sepenuhnya.");
        setGroups(dummyGroups);
        // Highlight dan Loyalty otomatis menggunakan nilai awal (dummy)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ title: "", location: "", date: "", members: 1, status: "Mendatang", img: "" });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, img: imageUrl });
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.location || !formData.date) return alert("Lengkapi form!");
    let color = "#4318FF";
    if (formData.status === "Aktif") color = "#E58E00";
    if (formData.status === "Selesai") color = "#8F9BBA";

    const newGroup: TravelGroup = {
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      date: formData.date,
      members: formData.members || 1,
      status: formData.status || "Mendatang",
      statusColor: color,
      img: formData.img || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    };

    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGroup),
      });
      if (response.ok) console.log("Berhasil disimpan ke database");
    } catch (error) {
      console.warn("Gagal menyimpan ke database, grup disimpan secara lokal.");
    }

    setGroups([newGroup, ...groups]);
    setIsModalOpen(false);
  };

  const processedGroups = groups
    .filter((grup) => {
      const matchSearch = grup.title.toLowerCase().includes(searchQuery.toLowerCase()) || grup.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterStatus === "Semua" ? true : grup.status === filterStatus;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "abjad") return a.title.localeCompare(b.title);
      else if (sortOrder === "terlama") return Number(a.id) - Number(b.id);
      else return Number(b.id) - Number(a.id);
    });

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <div className="traveler-layout">
          <TravelerSidebar activeMenu="grup" />

          <main className="traveler-main">
            <div className="page-header">
              <div>
                <h1>Grup Perjalanan Saya</h1>
                <p>Kelola perjalanan bersama keluarga dan kolega Anda.</p>
              </div>
              <button className="btn-create-group" onClick={handleOpenAdd}>
                <FaPlus /> Buat Grup Baru
              </button>
            </div>

            {/* BAGIAN HIGHLIGHT YANG SEKARANG DINAMIS */}
            <div className="highlight-grid">
              <div className="highlight-card bromo-card">
                <div className="bromo-info">
                  <span className="status-badge-orange">{highlight.status}</span>
                  <h2>{highlight.title}</h2>
                  <p>
                    Grup anda akan berangkat dalam <strong className="text-purple">{highlight.countdown} hari</strong> lagi.
                  </p>
                  <div className="bromo-meta">
                    <div className="avatar-group">
                      {highlight.avatars.map((avatar, index) => (
                        <img key={index} src={avatar} alt="Member" />
                      ))}
                      {highlight.extraMembers > 0 && <div className="avatar-more">+{highlight.extraMembers}</div>}
                    </div>
                    <div className="bromo-location">
                      <span className="meta-label">Lokasi</span>
                      <span className="meta-value">{highlight.location}</span>
                    </div>
                  </div>
                </div>
                <img src={highlight.img} alt="Highlight Cover" className="bromo-img" />
              </div>

              <div className="highlight-card loyalty-card">
                <div className="loyalty-icon">
                  <FaStar />
                </div>
                <h3>Loyalty Points</h3>
                <p>{loyalty.message}</p>
                <div className="points-display">
                  <h1>{loyalty.points}</h1> <span>PegiPoints</span>
                </div>
              </div>
            </div>

            <div className="toolbar">
              <div className="search-bar">
                <FaSearch className="text-gray" />
                <input type="text" placeholder="Cari nama grup atau tujuan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="toolbar-actions">
                <select className="filter-select-grup" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="Semua">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Mendatang">Mendatang</option>
                  <option value="Selesai">Selesai</option>
                </select>
                <select className="filter-select-grup" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="abjad">Abjad (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="groups-grid">
              {isLoading ? (
                <div style={{ padding: "20px", color: "#8F9BBA", gridColumn: "1 / -1", textAlign: "center", fontWeight: "bold" }}>Memuat data grup Anda...</div>
              ) : processedGroups.length > 0 ? (
                processedGroups.map((grup) => (
                  <div className="group-card" key={grup.id}>
                    <div className="card-img-wrapper">
                      <img src={grup.img} alt={grup.title} />
                    </div>
                    <div className="card-body">
                      <div className="card-title-row">
                        <h3>{grup.title}</h3>
                        <span style={{ color: grup.statusColor, fontWeight: "bold", fontSize: "13px" }}>{grup.status}</span>
                      </div>
                      <div className="card-meta-list">
                        <p>
                          <FaMapMarkerAlt className="text-gray" /> {grup.location}
                        </p>
                        <p>
                          <FaCalendarAlt className="text-gray" /> {grup.date}
                        </p>
                        <p>
                          <FaUsers className="text-gray" /> {grup.members} Anggota
                        </p>
                      </div>
                      <button className="btn-detail-grup" onClick={() => (window.location.href = `/obrolan/${grup.id}`)}>
                        Lihat Detail Grup
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", color: "#8F9BBA", gridColumn: "1 / -1", textAlign: "center" }}>Tidak ada grup yang sesuai.</div>
              )}

              {!isLoading && (
                <div className="create-new-card" onClick={handleOpenAdd}>
                  <div className="create-icon">
                    <FaPlus />
                  </div>
                  <h3>Mulai Perjalanan Baru</h3>
                  <p>Buat grup baru dan undang teman untuk berpetualang bersama.</p>
                  <button className="btn-text-purple">Tambah Sekarang</button>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* MODAL BUAT GRUP BARU */}
        {isModalOpen && (
          <div className="modal-overlay-grup">
            <div className="modal-content-grup" style={{ maxHeight: "90vh", overflowY: "auto" }}>
              <h2>Buat Grup Baru</h2>

              <div className="form-group-grup">
                <label>Nama Grup</label>
                <input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Cth: Liburan Keluarga Bali" />
              </div>

              <div className="form-group-grup">
                <label>Tujuan / Lokasi</label>
                <input type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Cth: Ubud, Bali" />
              </div>

              <div className="form-group-row-grup">
                <div className="form-group-grup">
                  <label>Tanggal Perjalanan</label>
                  <input type="text" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="Cth: 12 - 18 Okt 2024" />
                </div>
                <div className="form-group-grup">
                  <label>Jumlah Anggota</label>
                  <input type="number" min="1" value={formData.members || 1} onChange={(e) => setFormData({ ...formData, members: Number(e.target.value) })} />
                </div>
              </div>

              <div className="form-group-grup">
                <label>Status</label>
                <select value={formData.status || "Mendatang"} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="Aktif">Aktif</option>
                  <option value="Mendatang">Mendatang</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div className="form-group-grup">
                <label>Gambar Cover Grup (Opsional)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: "8px", cursor: "pointer" }} />
                {formData.img && (
                  <div style={{ marginTop: "10px", position: "relative", height: "150px", width: "100%", borderRadius: "10px", overflow: "hidden", border: "1px solid #eaeaea" }}>
                    <img src={formData.img} alt="Preview Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <div className="modal-actions-grup">
                <button className="btn-cancel-grup" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
                <button className="btn-save-grup" onClick={handleSave}>
                  Simpan Grup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GrupList;
