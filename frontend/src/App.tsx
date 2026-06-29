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

import LegalPage from "./pages/LegalPage";

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;

  if (path === "/hotel-search") return <HotelSearchPage />;
  if (path === "/hotel-detail") return <HotelDetailPage />;

  if (path === "/destination-search") return <DestinationSearchPage />;
  if (path === "/destination-detail") return <DestinationDetailPage />;
  if (path === "/travel-partner") return <TravelPartnerPage />;

  if (path === "/transport-search") return <TransportSearchPage />;
  if (path === "/transport-detail") return <TransportDetailPage />;

  if (path === "/payment-page") return <PaymentPage />;
  if (path === "/payment-success") return <PaymentSuccessPage />;
  

  if (path === "/help-center") return <HelpCenterPage />;

  if (path === "/profile") return <ProfilePage />;
  if (path === "/history") return <BookingHistoryPage />;
  if (path === "/wishlist") return <WishlistPage />;
  if (path === "/grup") return <GrupList />;
  if (path === "/grup/chat") return <GrupChat/>

  if (path === "/legal") return <LegalPage />;

  if (path === "/admin") return <AdminDashboard />;
  if (path === "/admin/users") return <AdminUserPage />;
  if (path === "/admin/hotels") return <AdminHotelPage />;
  if (path === "/admin/destinations") return <AdminDestinationPage />;
  if (path === "/admin/promos") return <AdminPromoPage />;
  if (path === "/admin/transport") return <AdminTransportPage />;
  if (path === "/admin/groups") return <AdminGroupPage />;
  if (path === "/admin/monitoring") return <AdminMonitoringPage />;
  if (path === "/admin/payments") return <AdminPaymentPage />;

  return <HomePage />;
}

export default App;
