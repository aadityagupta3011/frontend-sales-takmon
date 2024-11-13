import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUser({ token, role });
      if (role === 'boss') {
        navigate('/boss-dashboard');
      } else {
        navigate('/sales-dashboard');
      }
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
