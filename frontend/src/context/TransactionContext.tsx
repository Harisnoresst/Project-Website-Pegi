// src/context/TransactionContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import NotificationPopup from '../components/NotificationPopup';
import { getPayments, updatePaymentStatus } from '../services/adminService'; 

interface TransactionContextType {
  transactions: any[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
  isNotifOpen: boolean;
  setIsNotifOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPayments: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setTransactions(response.data); 
    } catch (error) {
      console.error("Gagal mengambil data transaksi dari database:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const pendingTransactions = transactions.filter(t => t.status === 'Menunggu');

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, isNotifOpen, setIsNotifOpen, refreshPayments: fetchPayments }}>
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