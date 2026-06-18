import React, { useState } from 'react';


interface ChartData {
  label: string;
  value: number; 
  isHighlight?: boolean; 
}

const StatistikChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Bulanan' | 'Mingguan'>('Bulanan');

  const dataBulanan: ChartData[] = [
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 60 },
    { label: 'Mar', value: 50 },
    { label: 'Apr', value: 90, isHighlight: true },
    { label: 'Mei', value: 70 },
    { label: 'Jun', value: 45 },
  ];

  const dataMingguan: ChartData[] = [
    { label: 'M1', value: 30 },
    { label: 'M2', value: 80, isHighlight: true },
    { label: 'M3', value: 40 },
    { label: 'M4', value: 60 },
  ];

  const activeData = activeTab === 'Bulanan' ? dataBulanan : dataMingguan;

  return (
    <div className="admin-card chart-card">
      <div className="card-header-flex">
        <h3>Tren Booking</h3>
        <div className="chart-tabs">
          <button 
            className={activeTab === 'Bulanan' ? 'active' : ''} 
            onClick={() => setActiveTab('Bulanan')}
          >
            Bulanan
          </button>
          <button 
            className={activeTab === 'Mingguan' ? 'active' : ''} 
            onClick={() => setActiveTab('Mingguan')}
          >
            Mingguan
          </button>
        </div>
      </div>
      
      {/* Container Balok Grafik */}
      <div className="dummy-chart-container">
        {activeData.map((item, index) => (
          <div 
            key={index} 
            className={`dummy-bar ${item.isHighlight ? 'active-bar' : ''}`} 
            style={{ height: `${item.value}%` }}
          ></div>
        ))}
      </div>
      
      {/* Label Bawah (Bulan / Minggu) */}
      <div className="chart-labels">
        {activeData.map((item, index) => (
          <span key={index} className={item.isHighlight ? 'text-purple fw-bold' : ''}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StatistikChart;