import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import Navbar from './components/NavBar/NavBar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserEmail(localStorage.getItem('userEmail'))
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail')
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} userEmail={userEmail || ''}/>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/catalogs"
          element={isAuthenticated ? <CatalogPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
