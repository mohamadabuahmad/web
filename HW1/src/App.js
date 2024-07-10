import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MyNetworkPage from './pages/MyNetworkPage';
import MessagingPage from './pages/MessagingPage';
import ProfilePage from './pages/ProfilePage';
import SkillsPage from './pages/SkillsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Layout from './components/Layout';

// Fake user database
const fakeUsers = [
  { email: 'user1@example.com', password: 'password1', firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
  { email: 'user2@example.com', password: 'password2', firstName: 'Jane', lastName: 'Smith', phone: '234-567-8901' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = fakeUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('Invalid email or password');
    }
  };

  const register = (user) => {
    fakeUsers.push(user);
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const saveSkills = (skills) => {
    console.log('Saved skills:', skills);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="/register" element={<RegisterPage onRegister={register} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={isLoggedIn ? <Layout><HomePage /></Layout> : <Navigate to="/login" />} />
        <Route path="/skills" element={isLoggedIn ? <Layout><SkillsPage onSaveSkills={saveSkills} /></Layout> : <Navigate to="/login" />} />
        <Route path="/home" element={isLoggedIn ? <Layout><HomePage /></Layout> : <Navigate to="/login" />} />
        <Route path="/network" element={isLoggedIn ? <Layout><MyNetworkPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/messaging" element={isLoggedIn ? <Layout><MessagingPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Layout><ProfilePage onLogout={logout} /></Layout> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
