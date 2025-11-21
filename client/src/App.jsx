import React, { useEffect, useState } from 'react';
import Login from '../src/components/Login';
import Dashboard from '../src/components/Dashboard';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUsername(localStorage.getItem('username'));
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const handleLogin = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUsername(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
