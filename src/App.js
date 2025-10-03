import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Superlogin from "./components/login/superlogin.jsx";
import Superpanel from "./components/superpanel.jsx";
import AdminViewMessages from "./components/admin.jsx";

const ProtectedRoute1 = ({ children }) => {
  const isLogged = localStorage.getItem("isLogged") === "true";
  const location = useLocation();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Superlogin />} />
      <Route path="/dashboard" element={<Superpanel />} />
      <Route path="/admin"element={<ProtectedRoute1><AdminViewMessages /></ProtectedRoute1>}/>
 <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}
