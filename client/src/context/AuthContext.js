import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, fetch user profile or decode token
      setUser({ token }); // Simplified, replace with real user data
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('/auth/register', { username, email, password });
      // After register, optionally auto-login or redirect to login page
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add useAuth hook for easier context consumption
export const useAuth = () => {
  return useContext(AuthContext);
};
