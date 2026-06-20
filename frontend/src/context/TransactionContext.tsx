import React, { createContext, useContext, useState } from 'react';
import NotificationPopup from '../components/NotificationPopup';

// 1. Definisikan tipe data Transaction di sini agar dikenali
export interface Transaction {
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

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  isNotifOpen: boolean;
  setIsNotifOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // 2. Gunakan SATU useState saja untuk transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      txId: "INV-2405-001",
      customerName: "Andi Prasetya",
      serviceType: "Hotel",
      serviceName: "Luxury Resort Bali (2 Malam)",
      amount: "Rp 3.500.000",
      date: "20 Mei 2024, 14:30",
      status: "Menunggu",
      proofImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      txId: "INV-2405-002",
      customerName: "Santi Wijaya",
      serviceType: "Transportasi",
      serviceName: "Argo Bromo Anggrek (JKT-SBY)",
      amount: "Rp 1.200.000",
      date: "20 Mei 2024, 10:15",
      status: "Menunggu",
      proofImg: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "3",
      txId: "INV-2405-003",
      customerName: "Budi Kusuma",
      serviceType: "Destinasi",
      serviceName: "Tiket Candi Borobudur (4 Orang)",
      amount: "Rp 200.000",
      date: "19 Mei 2024, 08:00",
      status: "Berhasil",
      proofImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    },
    { 
      id: '4',
      txId: 'INV-2405-004', 
      customerName: 'Asa Mitaka', 
      serviceType: 'Grup Wisata', 
      serviceName: 'Explorers Bali 2024', 
      amount: 'Rp 1.500.000', 
      date: '18 Mei 2024, 16:45', 
      status: 'Ditolak', 
      proofImg: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=400&q=80',
      isSplitBill: true, 
      totalGroupBill: 'Rp 6.000.000', 
      splitCount: 4 
    },
    { 
      id: '5', 
      txId: 'INV-2406-999', 
      customerName: 'Asa Mitaka', 
      serviceType: 'Grup Wisata', 
      serviceName: 'Bromo Midnight Trip', 
      amount: 'Rp 300.000', 
      date: '20 Jun 2026, 09:15', 
      status: 'Menunggu', 
      proofImg: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
      isSplitBill: true, 
      totalGroupBill: 'Rp 1.500.000', 
      splitCount: 5 
    },
  ]);

  const pendingTransactions = transactions.filter(t => t.status === 'Menunggu');

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, isNotifOpen, setIsNotifOpen }}>
      {children}
      <NotificationPopup 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
        notifications={pendingTransactions}
      />
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransaction harus digunakan di dalam TransactionProvider");
  return context;
};