import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const path = window.location.pathname;

  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;
  if (path === "/profile") return <ProfilePage />;
  // Jika URL root '/', tampilkan HomePage
  return <HomePage />;
}

export default App;
