import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

import HotelSearchPage from "./pages/HotelSearchPage";
import HotelDetailPage from "./pages/HotelDetailPage";

import DestinationSearchPage from "./pages/DestinationSearchPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";

import TransportSearchPage from "./pages/TransportSearchPage";

import ProfilePage from "./pages/ProfilePage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import WishlistPage from "./pages/WishlistPage";
import GrupList from "./pages/GrupList";
import GrupChat from "./pages/GroupChat";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUserPage from "./pages/AdminUserPage";
import AdminHotelPage from "./pages/AdminHotelPage";
import AdminDestinationPage from "./pages/AdminDestinationPage";
import AdminPromoPage from "./pages/AdminPromoPage";
import AdminTransportPage from "./pages/AdminTransportPage";
import AdminGroupPage from "./pages/AdminGroupPage";
import AdminMonitoringPage from "./pages/AdminMonitoringPage";
import AdminPaymentPage from "./pages/AdminPaymentPage";

function App() {
  return (
    // React Router yang bakal otomatis mantau perubahan URL tanpa perlu refresh
    <Routes>
      {/* Rute Publik */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rute Hotel */}
      <Route path="/hotel-search" element={<HotelSearchPage />} />
      <Route path="/hotel-detail" element={<HotelDetailPage />} />

      {/* Rute Destinasi */}
      <Route path="/destination-search" element={<DestinationSearchPage />} />
      <Route path="/destination-detail" element={<DestinationDetailPage />} />

      {/* Rute Transportasi */}
      <Route path="/transport-search" element={<TransportSearchPage />} />

      {/* Rute User */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/history" element={<BookingHistoryPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/grup" element={<GrupList />} />
      <Route path="/grup/chat" element={<GrupChat />} />

      {/* Rute Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUserPage />} />
      <Route path="/admin/hotels" element={<AdminHotelPage />} />
      <Route path="/admin/destinations" element={<AdminDestinationPage />} />
      <Route path="/admin/promos" element={<AdminPromoPage />} />
      <Route path="/admin/transport" element={<AdminTransportPage />} />
      <Route path="/admin/groups" element={<AdminGroupPage />} />
      <Route path="/admin/monitoring" element={<AdminMonitoringPage />} />
      <Route path="/admin/payments" element={<AdminPaymentPage />} />

      {/* Rute Default (Kalau user ngetik alamat sembarangan atau buka web pertama kali) */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;