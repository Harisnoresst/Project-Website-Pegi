import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import WishlistPage from "./pages/WishlistPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserPage from "./pages/AdminUserPage";
import AdminHotelPage from "./pages/AdminHotelPage";
import AdminDestinationPage from "./pages/AdminDestinationPage";
import AdminPromoPage from "./pages/AdminPromoPage";
import AdminTransportPage from "./pages/AdminTransportPage";
import AdminGroupPage from "./pages/AdminGroupPage";
import AdminMonitoringPage from "./pages/AdminMonitoringPage";

function App() {
  const path = window.location.pathname;

  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;
  if (path === "/profile") return <ProfilePage />;
  if (path === "/history") return <BookingHistoryPage />;
  if (path === "/wishlist") return <WishlistPage />;
  if (path === "/admin") return <AdminDashboard />;
  if (path === "/admin/users") return <AdminUserPage />;
  if (path === "/admin/hotels") return <AdminHotelPage />;
  if (path === "/admin/destinations") return <AdminDestinationPage />;
  if (path === "/admin/promos") return <AdminPromoPage />;
  if (path === "/admin/transport") return <AdminTransportPage />;
  if (path === "/admin/groups") return <AdminGroupPage />;
  if (path === "/admin/monitoring") return <AdminMonitoringPage />;
  // Jika URL root '/', tampilkan HomePage
  return <HomePage />;
}

export default App;
