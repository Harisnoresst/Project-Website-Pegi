import React, { useState } from 'react';
import { 
  FaBullhorn, FaSearch, FaBolt, 
  FaCalendarAlt, FaTicketAlt, FaBullseye, FaTrash 
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import './AdminPromoPage.css';

// --- Interfaces ---
interface PromoCard {
  id: string;
  title: string;
  status: 'Aktif' | 'Draft' | 'Berakhir';
  code: string;
  category: string;
  discount: string;
  validUntil: string;
  usageCount: number;
  usageLimit: number;
  img: string;
}

const AdminPromoPage: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // --- DATA STATE (Bisa Ditambah/Diedit/Dihapus) ---
  const [promos, setPromos] = useState<PromoCard[]>([
    { id: '1', title: 'Liburan Hemat Awal Tahun', status: 'Aktif', code: 'PEGIHEMAT24', category: 'Tiket Pesawat', discount: '25% OFF', validUntil: '31 Jan 2024', usageCount: 450, usageLimit: 1000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80' },
    { id: '2', title: 'Luxury Staycation Bali', status: 'Draft', code: 'BALILUX100', category: 'Hotel', discount: 'Rp 1.500.000', validUntil: '15 Feb 2024', usageCount: 0, usageLimit: 500, img: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8628?auto=format&fit=crop&w=150&q=80' },
    { id: '3', title: 'Promo Akhir Tahun 2023', status: 'Berakhir', code: 'BYE2023', category: 'Semua Kategori', discount: '50% OFF', validUntil: '31 Des 2023', usageCount: 2500, usageLimit: 2500, img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=150&q=80' },
    { id: '4', title: 'Jelajah Eropa Bersama', status: 'Aktif', code: 'EUROGROUP', category: 'Grup Wisata', discount: 'Rp 2.000.000', validUntil: '10 Mar 2024', usageCount: 12, usageLimit: 50, img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80' }
  ]);

  // --- STATE MODAL CRUD ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<PromoCard>>({});

  // Buka Modal Tambah Data
  const handleOpenAdd = () => {
    setModalType('add');
    setFormData({ title: '', code: '', category: 'Tiket Pesawat', discount: '', status: 'Draft', validUntil: '', usageLimit: 0, usageCount: 0, img: '' });
    setIsModalOpen(true);
  };

  // Buka Modal Edit Data
  const handleOpenEdit = (promo: PromoCard) => {
    setModalType('edit');
    setFormData(promo);
    setIsModalOpen(true);
  };

  // Fungsi Hapus Data
  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus promo ini?")) {
      setPromos(promos.filter(p => p.id !== id));
    }
  };

  // Fungsi Simpan Data (Dari Modal)
  const handleSave = () => {
    if (modalType === 'add') {
      const newPromo = { 
        ...formData, 
        id: Date.now().toString(), 
        usageCount: 0, // Promo baru mulai dari 0 penggunaan
        img: formData.img || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80' 
      } as PromoCard;
      setPromos([...promos, newPromo]);
    } else {
      setPromos(promos.map(p => p.id === formData.id ? (formData as PromoCard) : p));
    }
    setIsModalOpen(false);
  };

  // Logika Filter Data
  const filteredPromos = promos.filter(promo => {
    const matchSearch = promo.title.toLowerCase().includes(localSearch.toLowerCase()) || promo.code.toLowerCase().includes(localSearch.toLowerCase());
    const matchCat = categoryFilter === 'Semua Kategori' || promo.category === categoryFilter;
    const matchStatus = statusFilter === 'Semua Status' || promo.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="promo" />
      
      <main className="admin-main">
        <AdminTopbar showSearch={false} searchQuery={globalSearch} setSearchQuery={setGlobalSearch} />

        <div className="promo-container">
          
          {/* HEADER SECTION */}
          <div className="promo-header-section">
            <div className="title-area">
              <h1>Manajemen Promo</h1>
              <p>Kelola kampanye pemasaran, diskon, dan voucher perjalanan.</p>
            </div>
            {/* Tombol pemicu Modal Tambah */}
            <button className="btn-create-promo" onClick={handleOpenAdd}>
              <FaBullhorn /> Buat Promo Baru
            </button>
          </div>

          {/* STATS CARDS ROW (Disingkat untuk fokus ke CRUD, Anda bisa mempertahankan yang lama) */}
          <div className="promo-stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-purple-light text-purple"><FaBolt /></div>
              <div className="stat-info"><p>Promo Aktif</p><h3>{promos.filter(p => p.status === 'Aktif').length}</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-gray-light text-gray"><FaCalendarAlt /></div>
              <div className="stat-info"><p>Promo Berakhir</p><h3>{promos.filter(p => p.status === 'Berakhir').length}</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-purple-light text-purple"><FaTicketAlt /></div>
              <div className="stat-info"><p>Total Penggunaan</p><h3>12.5k</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange-light text-orange"><FaBullseye /></div>
              <div className="stat-info"><p>Konversi Promo</p><h3>8.2%</h3></div>
            </div>
          </div>

          {/* FILTER & TOOLBAR */}
          <div className="promo-toolbar">
            <div className="toolbar-left">
              <div className="local-search">
                <FaSearch className="text-gray" />
                <input type="text" placeholder="Cari nama promo atau kode..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} />
              </div>
              <select className="promo-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="Semua Kategori">Semua Kategori</option>
                <option value="Tiket Pesawat">Tiket Pesawat</option>
                <option value="Hotel">Hotel</option>
                <option value="Grup Wisata">Grup Wisata</option>
              </select>
              <select className="promo-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Draft">Draft</option>
                <option value="Berakhir">Berakhir</option>
              </select>
            </div>
          </div>

          {/* PROMO CARDS GRID */}
          <div className="promo-cards-grid">
            {filteredPromos.map((promo) => {
              const progressPercent = promo.usageLimit > 0 ? (promo.usageCount / promo.usageLimit) * 100 : 0;
              
              return (
                <div className="promo-card" key={promo.id}>
                  <div className="p-card-top">
                    <img src={promo.img} alt={promo.title} className="p-card-img" />
                    <div className="p-card-info">
                      <div className="p-card-title-row">
                        <h4>{promo.title}</h4>
                        <span className={`p-badge ${promo.status.toLowerCase()}`}>{promo.status}</span>
                      </div>
                      <div className="p-card-code-row">
                        <span className="code-box">{promo.code}</span>
                        <span className="dot">•</span>
                        <span className="text-gray sm-text">{promo.category}</span>
                      </div>
                      <div className="p-card-details">
                        <div><label>Potongan Harga</label><p className="fw-bold text-purple">{promo.discount}</p></div>
                        <div><label>Berlaku s/d</label><p className="fw-bold">{promo.validUntil}</p></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-card-progress-section">
                    <div className="progress-labels">
                      <span>Penggunaan: {promo.usageCount}/{promo.usageLimit}</span>
                      <span className={promo.status === 'Berakhir' ? 'text-red fw-bold' : 'text-purple fw-bold'}>
                        {promo.status === 'Berakhir' ? 'Selesai' : `${progressPercent.toFixed(0)}%`}
                      </span>
                    </div>
                    <div className="progress-track">
                      <div className={`progress-fill ${promo.status === 'Berakhir' ? 'bg-red' : 'bg-purple'}`} style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS (Detail dihapus, Edit & Delete diaktifkan) */}
                  <div className="p-card-actions">
                    <button className="btn-outline-primary" onClick={() => handleOpenEdit(promo)}>Edit Promo</button>
                    {promo.status === 'Aktif' && <button className="btn-text text-red" onClick={() => setPromos(promos.map(p => p.id === promo.id ? {...p, status: 'Berakhir'} : p))}>Hentikan</button>}
                    {promo.status === 'Draft' && <button className="btn-outline-primary" onClick={() => setPromos(promos.map(p => p.id === promo.id ? {...p, status: 'Aktif'} : p))}>Publikasikan</button>}
                    <button className="btn-icon-red" onClick={() => handleDelete(promo.id)} title="Hapus"><FaTrash /></button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* MODAL POPUP CRUD */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalType === 'add' ? 'Buat Promo Baru' : 'Edit Promo'}</h2>
            
            <div className="form-group">
              <label>Judul Promo</label>
              <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Cth: Liburan Hemat" />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Kode Promo</label>
                <input type="text" value={formData.code || ''} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="Cth: HEMAT100" />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select value={formData.category || 'Tiket Pesawat'} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Tiket Pesawat">Tiket Pesawat</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Grup Wisata">Grup Wisata</option>
                  <option value="Semua Kategori">Semua Kategori</option>
                </select>
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Potongan Harga</label>
                <input type="text" value={formData.discount || ''} onChange={(e) => setFormData({...formData, discount: e.target.value})} placeholder="Cth: Rp 500.000 / 20% OFF" />
              </div>
              <div className="form-group">
                <label>Batas Penggunaan (Kuota)</label>
                <input type="number" value={formData.usageLimit || 0} onChange={(e) => setFormData({...formData, usageLimit: Number(e.target.value)})} />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Berlaku S/D</label>
                <input 
                  type="date" 
                  value={formData.validUntil || ''} 
                  onChange={(e) => setFormData({...formData, validUntil: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status || 'Draft'} onChange={(e) => setFormData({...formData, status: e.target.value as any})}>
                  <option value="Draft">Draft</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Berakhir">Berakhir</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Upload Banner Promo</label>
              <input type="file" accept="image/*" className="file-input" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({...formData, img: URL.createObjectURL(e.target.files[0])});
                }
              }} />
              {formData.img && <div className="upload-preview"><img src={formData.img} alt="Preview" /></div>}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn-save" onClick={handleSave}>Simpan Promo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromoPage;