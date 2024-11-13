import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track if auth check is in progress
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      API.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setUser({ token, role });
        })
        .catch(() => {
          logout(); // Log out if token is invalid or expired
        })
        .finally(() => setLoading(false)); // End loading state
    } else {
      setLoading(false); // No token, end loading state
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUser({ token, role });
      navigate(role === 'boss' ? '/boss-dashboard' : '/sales-dashboard');
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while auth check is in progress
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
