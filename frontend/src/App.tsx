import React from "react";

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
import HelpCenterPage from "./pages/HelpCenterPage";
import TravelPartnerPage from "./pages/TravelPartnerPage";
import TransportDetailPage from "./pages/TransportDetailPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AdminPaymentPage from "./pages/AdminPaymentPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Utama */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rute Hotel & Destinasi */}
        <Route path="/hotel-search" element={<HotelSearchPage />} />
        <Route path="/hotel-detail" element={<HotelDetailPage />} />
        <Route path="/destination-search" element={<DestinationSearchPage />} />
        <Route path="/destination-detail" element={<DestinationDetailPage />} />
        <Route path="/travel-partner" element={<TravelPartnerPage />} />
        
        {/* Rute Transportasi & Pembayaran */}
        <Route path="/transport-search" element={<TransportSearchPage />} />
        <Route path="/transport-detail" element={<TransportDetailPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        
        {/* Rute User Area */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/grup" element={<GrupList />} />
        
        {/* RUTE OBROLAN DINAMIS (ID) */}
        <Route path="/obrolan/:id" element={<GrupChat />} />

        {/* RUTE OBROLAN STATIS (ID) */}
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

        {/* Rute Bantuan */}
        <Route path="/help-center" element={<HelpCenterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;