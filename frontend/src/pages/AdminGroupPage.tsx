import React, { useState } from 'react';
import { 
 FaMapMarkerAlt, FaUserPlus, 
  FaCommentAlt, FaCheck, FaExclamationTriangle, FaEdit, FaTrash 
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import './AdminGroupPage.css';

interface TourGroup {
  id: string;
  name: string;
  createdAt: string;
  img: string;
  leaderName: string;
  leaderTier: string;
  currentMembers: number;
  maxMembers: number;
  destination: string;
  status: 'Aktif' | 'Menunggu' | 'Selesai';
}

const AdminGroupPage: React.FC = () => {
  // Pencarian diletakkan di Topbar sesuai permintaan
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // --- DUMMY DATA GRUP ---
  const [groups, setGroups] = useState<TourGroup[]>([
    { id: '1', name: 'Explorers Bali 2024', createdAt: 'Dibuat 12 Jan 2024', img: 'https://images.unsplash.com/photo-1516483638261-f40af5ba608d?auto=format&fit=crop&w=150&q=80', leaderName: 'Budi Santoso', leaderTier: 'Silver Member', currentMembers: 42, maxMembers: 50, destination: 'Uluwatu, Bali', status: 'Aktif' },
    { id: '2', name: 'Tokyo Night Runners', createdAt: 'Dibuat 05 Feb 2024', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=150&q=80', leaderName: 'Siti Aminah', leaderTier: 'Gold Member', currentMembers: 15, maxMembers: 20, destination: 'Shinjuku, Japan', status: 'Menunggu' },
    { id: '3', name: 'Dubai Luxury Trip', createdAt: 'Dibuat 20 Des 2023', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=150&q=80', leaderName: 'Andi Wijaya', leaderTier: 'Platinum Member', currentMembers: 10, maxMembers: 10, destination: 'Dubai, UAE', status: 'Selesai' }
  ]);

  // --- STATE MODAL CRUD ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<TourGroup>>({});

  const handleOpenAdd = () => {
    setModalType('add');
    setFormData({ name: '', leaderName: '', destination: '', currentMembers: 0, maxMembers: 20, status: 'Menunggu', leaderTier: 'Silver Member' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (group: TourGroup) => {
    setModalType('edit');
    setFormData(group);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Yakin ingin menghapus grup ini?")) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newGroup = {
        ...formData,
        id: Date.now().toString(),
        createdAt: 'Dibuat Baru Saja',
        img: formData.img || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80'
      } as TourGroup;
      setGroups([...groups, newGroup]);
    } else {
      setGroups(groups.map(g => g.id === formData.id ? (formData as TourGroup) : g));
    }
    setIsModalOpen(false);
  };

  // Filter Data (Pencarian dari Topbar & Dropdown Status)
  const filteredGroups = groups.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        g.leaderName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        g.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'Semua Status' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="grup" />
      
      <main className="admin-main">
        {/* Pencarian diaktifkan di Topbar */}
        <AdminTopbar 
          showSearch={true} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          placeholder="Cari nama grup, ketua, atau destinasi..." 
        />

        <div className="group-content-grid">
          
          {/* KOLOM KIRI: DAFTAR GRUP */}
          <div className="group-list-section">
            <div className="page-header">
              <div className="title-area">
                <h1>Manajemen Grup Wisata</h1>
                <p>Pantau dan kelola aktivitas komunitas dalam ekosistem perjalanan Anda secara real-time.</p>
              </div>
            </div>

            <div className="filter-bar-group">
              <span className="text-gray fw-bold">Filter:</span>
              <select className="select-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            <div className="table-card-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>FOTO & NAMA GRUP</th>
                    <th>KETUA GRUP</th>
                    <th>ANGGOTA</th>
                    <th>TUJUAN WISATA</th>
                    <th>STATUS</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map((group) => (
                    <tr key={group.id}>
                      <td>
                        <div className="group-info-cell">
                          <img src={group.img} alt={group.name} className="group-avatar" />
                          <div>
                            <span className="fw-bold text-dark d-block">{group.name}</span>
                            <span className="text-gray sm-text">{group.createdAt}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold text-dark d-block">{group.leaderName}</span>
                        <span className="text-gray sm-text">{group.leaderTier}</span>
                      </td>
                      <td>
                        <span className="member-badge">{group.currentMembers}/{group.maxMembers}</span>
                      </td>
                      <td>
                        <div className="dest-cell">
                          <FaMapMarkerAlt className="text-purple" />
                          <span className="text-dark fw-600">{group.destination}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${group.status.toLowerCase()}`}>{group.status}</span>
                      </td>
                      <td>
                        <div className="action-icons">
                          <button className="icon-btn edit" onClick={() => handleOpenEdit(group)}><FaEdit /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(group.id)}><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <span className="text-gray sm-text">Menampilkan 1-{filteredGroups.length} dari 128 grup wisata</span>
                <div className="pagination-controls">
                  <button className="page-btn">{'<'}</button>
                  <button className="page-btn">{'>'}</button>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: SIDEBAR MONITORING */}
          <div className="group-sidebar-section">
            
            {/* Analitik Komunitas */}
            <div className="widget-card">
              <h3 className="widget-title">Analitik Komunitas</h3>
              <div className="analytics-grid">
                <div className="analytic-box">
                  <p>Total Grup</p>
                  <h2 className="text-purple">1,248</h2>
                </div>
                <div className="analytic-box">
                  <p className="text-green">Grup Aktif</p>
                  <h2 className="text-green">86</h2>
                </div>
                <div className="analytic-box">
                  <p className="text-orange">Rata-rata Anggota</p>
                  <h2 className="text-orange">24</h2>
                </div>
                <div className="analytic-box">
                  <p className="text-purple-light">Destinasi Favorit</p>
                  <h2 className="text-purple">Bali</h2>
                </div>
              </div>
            </div>

            {/* Insight Komunitas */}
            <div className="widget-card">
              <div className="insight-header">
                <h3 className="widget-title">Insight Komunitas</h3>
                <span className="insight-score text-purple fw-bold">84%</span>
              </div>
              <p className="text-gray sm-text mb-15">Tingkat engagement anggota grup meningkat 12% dibanding bulan lalu.</p>
              
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '84%' }}></div>
              </div>
              <div className="progress-labels">
                <span>Target: 90%</span>
                <span>Terlewati: 75%</span>
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="widget-card">
              <h3 className="widget-title mb-15">Aktivitas Terbaru</h3>
              <div className="activity-list">
                
                <div className="activity-item">
                  <div className="act-icon bg-blue-light text-blue"><FaUserPlus /></div>
                  <div className="act-content">
                    <p><strong>Ria Kartika</strong> bergabung ke grup <strong className="text-purple">Labuan Bajo Expedition</strong></p>
                    <span>Baru saja</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="act-icon bg-purple-light text-purple"><FaCommentAlt /></div>
                  <div className="act-content">
                    <p>Pesan baru di grup <strong className="text-purple">Paris Honeymoon</strong></p>
                    <span>2 menit yang lalu</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="act-icon bg-green-light text-green"><FaCheck /></div>
                  <div className="act-content">
                    <p>Trip <strong className="text-purple">Wonder of Iceland</strong> telah selesai dengan sukses</p>
                    <span>1 jam yang lalu</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="act-icon bg-orange-light text-orange"><FaExclamationTriangle /></div>
                  <div className="act-content">
                    <p>Ketua grup <strong className="text-purple">Bromo Midnight</strong> memperbarui jadwal perjalanan</p>
                    <span>3 jam yang lalu</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* MODAL POPUP CRUD */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalType === 'add' ? 'Buat Grup Baru' : 'Edit Grup'}</h2>
            
            <div className="form-group">
              <label>Nama Grup</label>
              <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Cth: Bali Explorers 2024" />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Nama Ketua Grup</label>
                <input type="text" value={formData.leaderName || ''} onChange={(e) => setFormData({...formData, leaderName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tujuan Wisata</label>
                <input type="text" value={formData.destination || ''} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Maksimal Anggota</label>
                <input 
                  type="number" 
                  value={formData.maxMembers || 0} 
                  onChange={(e) => setFormData({...formData, maxMembers: Number(e.target.value)})} 
                />
              </div>
              
              <div className="form-group">
                <label>Status Grup</label>
                <select 
                  value={formData.status || 'Menunggu'} 
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn-save" onClick={handleSave}>Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGroupPage;