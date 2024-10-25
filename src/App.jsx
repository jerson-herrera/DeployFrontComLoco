// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Simulación de registro
import Dashboard from './components/Dashboard'; // Simulación de dashboard
import { AuthProvider } from './contexto/AuthContext.jsx'; // Asegúrate de la ruta
import  DashboardAdmin  from './components/DashboardAdmin.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
