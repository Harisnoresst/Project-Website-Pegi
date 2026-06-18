import React, { useState } from 'react';
import { 
  FaPlus, FaBus, FaCheckCircle, 
  FaWrench, FaTimesCircle, FaEdit, FaTrash 
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import './AdminTransportPage.css';

// --- Interfaces ---
interface Transport {
  id: string;
  name: string;
  detail: string; // Misal: Plat nomor atau Kelas (B 7123 VGA)
  type: 'BUS' | 'KERETA' | 'TRAVEL' | 'SHUTTLE';
  route: string;
  price: string;
  capacity: string;
  status: 'Aktif' | 'Maintenance' | 'Nonaktif';
  img: string;
}

const AdminTransportPage: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState('');
  
  // State Filter
  const [typeFilter, setTypeFilter] = useState('Semua Jenis');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // --- DUMMY DATA ---
  const [transports, setTransports] = useState<Transport[]>([
    { id: '1', name: 'Agra Mas Jetbus 3+', detail: 'B 7123 VGA', type: 'BUS', route: 'Jakarta - Solo', price: 'Rp 250.000', capacity: '45 Kursi', status: 'Aktif', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=150&q=80' },
    { id: '2', name: 'Argo Bromo Anggrek', detail: 'Eksekutif Luxury', type: 'KERETA', route: 'Jakarta - Surabaya', price: 'Rp 1.200.000', capacity: '18 Kursi', status: 'Aktif', img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=150&q=80' },
    { id: '3', name: 'Baraya Travel', detail: 'Toyota Hiace Luxury', type: 'TRAVEL', route: 'Bandung - Jakarta', price: 'Rp 125.000', capacity: '11 Kursi', status: 'Maintenance', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=150&q=80' },
    { id: '4', name: 'Pegi Shuttle Airport', detail: 'SH-009 Premium', type: 'SHUTTLE', route: 'Bandara Soetta - BSD', price: 'Rp 80.000', capacity: '14 Kursi', status: 'Nonaktif', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=150&q=80' }
  ]);

  // --- STATE MODAL CRUD ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<Transport>>({});

  // Fungsi Buka Modal
  const handleOpenAdd = () => {
    setModalType('add');
    setFormData({ name: '', detail: '', type: 'BUS', route: '', price: '', capacity: '', status: 'Aktif', img: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transport: Transport) => {
    setModalType('edit');
    setFormData(transport);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Yakin ingin menghapus armada ini?")) {
      setTransports(transports.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newTransport = { 
        ...formData, 
        id: Date.now().toString(),
        img: formData.img || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=150&q=80' 
      } as Transport;
      setTransports([...transports, newTransport]);
    } else {
      setTransports(transports.map(t => t.id === formData.id ? (formData as Transport) : t));
    }
    setIsModalOpen(false);
  };

  // Logika Filter & Search
  const filteredTransports = transports.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
                        t.route.toLowerCase().includes(globalSearch.toLowerCase());
    const matchType = typeFilter === 'Semua Jenis' || t.type === typeFilter;
    const matchStatus = statusFilter === 'Semua Status' || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar activeMenu="transportasi" />
      
      <main className="admin-main">
        <AdminTopbar showSearch={true} searchQuery={globalSearch} setSearchQuery={setGlobalSearch} placeholder="Cari armada atau rute..." />

        <div className="transport-container">
          
          {/* HEADER */}
          <div className="page-header">
            <div className="title-area">
              <h1>Manajemen Transportasi</h1>
              <p>Kelola armada bus, travel, kereta, dan layanan shuttle antar kota.</p>
            </div>
            <button className="btn-primary" onClick={handleOpenAdd}>
              <FaPlus /> Tambah Transportasi Baru
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-purple-light text-purple"><FaBus /></div>
              <div className="stat-info"><p>Total Armada</p><h3>{transports.length}</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green-light text-green"><FaCheckCircle /></div>
              <div className="stat-info"><p>Aktif</p><h3>{transports.filter(t => t.status === 'Aktif').length}</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange-light text-orange"><FaWrench /></div>
              <div className="stat-info"><p>Maintenance</p><h3>{transports.filter(t => t.status === 'Maintenance').length}</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-red-light text-red"><FaTimesCircle /></div>
              <div className="stat-info"><p>Nonaktif</p><h3>{transports.filter(t => t.status === 'Nonaktif').length}</h3></div>
            </div>
          </div>

          {/* FILTER & SORT */}
          <div className="filter-bar">
            <div className="filter-left">
              <select className="select-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="Semua Jenis">Jenis Transportasi</option>
                <option value="BUS">Bus</option>
                <option value="KERETA">Kereta</option>
                <option value="TRAVEL">Travel</option>
                <option value="SHUTTLE">Shuttle</option>
              </select>
              <select className="select-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Semua Status">Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
            <div className="filter-right">
              <span className="text-gray sm-text">Urutkan: <strong className="text-purple">Terbaru ↓</strong></span>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="table-card-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nama Transportasi</th>
                  <th>Jenis</th>
                  <th>Rute</th>
                  <th>Harga</th>
                  <th>Kapasitas</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransports.map((item) => (
                  <tr key={item.id}>
                    <td><img src={item.img} alt={item.name} className="img-thumb" /></td>
                    <td>
                      <span className="fw-bold d-block text-dark">{item.name}</span>
                      <span className="text-gray sm-text">{item.detail}</span>
                    </td>
                    <td><span className={`badge-type ${item.type.toLowerCase()}`}>{item.type}</span></td>
                    <td className="text-gray">{item.route}</td>
                    <td className="fw-bold text-dark">{item.price}</td>
                    <td className="text-gray">{item.capacity}</td>
                    <td>
                      <div className={`status-indicator ${item.status.toLowerCase()}`}>
                        <span className="dot"></span> {item.status}
                      </div>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn edit" onClick={() => handleOpenEdit(item)}><FaEdit /></button>
                        <button className="icon-btn delete" onClick={() => handleDelete(item.id)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="table-footer">
              <span className="text-gray sm-text">Menampilkan 1-{filteredTransports.length} dari {transports.length} armada</span>
              <div className="pagination-controls">
                <button className="page-btn">{'<'}</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">{'>'}</button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* MODAL POPUP CRUD */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalType === 'add' ? 'Tambah Transportasi Baru' : 'Edit Transportasi'}</h2>
            
            <div className="form-group-row">
              <div className="form-group">
                <label>Nama Armada</label>
                <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Cth: Agra Mas Jetbus 3+" />
              </div>
              <div className="form-group">
                <label>Detail / Plat Nomor</label>
                <input type="text" value={formData.detail || ''} onChange={(e) => setFormData({...formData, detail: e.target.value})} placeholder="Cth: B 7123 VGA" />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Jenis</label>
                <select value={formData.type || 'BUS'} onChange={(e) => setFormData({...formData, type: e.target.value as any})}>
                  <option value="BUS">BUS</option>
                  <option value="KERETA">KERETA</option>
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="SHUTTLE">SHUTTLE</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status || 'Aktif'} onChange={(e) => setFormData({...formData, status: e.target.value as any})}>
                  <option value="Aktif">Aktif</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Rute</label>
              <input type="text" value={formData.route || ''} onChange={(e) => setFormData({...formData, route: e.target.value})} placeholder="Cth: Jakarta - Solo" />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Harga Tiket</label>
                <input type="text" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="Cth: Rp 250.000" />
              </div>
              <div className="form-group">
                <label>Kapasitas Kursi</label>
                <input type="text" value={formData.capacity || ''} onChange={(e) => setFormData({...formData, capacity: e.target.value})} placeholder="Cth: 45 Kursi" />
              </div>
            </div>

            <div className="form-group">
              <label>Upload Foto Armada</label>
              <input type="file" accept="image/*" className="file-input" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({...formData, img: URL.createObjectURL(e.target.files[0])});
                }
              }} />
              {formData.img && <div className="upload-preview"><img src={formData.img} alt="Preview" /></div>}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn-save" onClick={handleSave}>Simpan Data</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTransportPage;