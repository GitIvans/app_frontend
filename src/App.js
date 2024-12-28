import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegisterPage from './pages/LoginRegisterPage';  // Импортируем новый компонент
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Используем одну страницу для логина и регистрации */}
        <Route path="/" element={<LoginRegisterPage />} />
        {/* Доступ к главной странице только после успешного входа */}
        <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
