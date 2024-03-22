import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RecordsPage from './pages/RecordsPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreateSchedule from './pages/CreateSchedulePage';
import EmailsListPage from './pages/EmailsListPage';

function App() {
  document.title = 'App Email'
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <div className='container'>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            {isLoggedIn && (
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/records" element={<RecordsPage />} />
                <Route path="/create-schedule" element={<CreateSchedule />} />
                <Route path="/schedule-details/:id" element={<EmailsListPage />} />
              </Route>
            )}
            {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
