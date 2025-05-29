import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchProfile(token);
    else setLoading(false);
  }, []);

	// Fetch user profile using the token
  async function fetchProfile(token) {
    try {
      const res = await axios.get('http://localhost:1975/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }

  // Login function
  async function login(email, password) {
    const res = await axios.post('http://localhost:1975/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    await fetchProfile(res.data.token);
    navigate('/', { replace: true });
  }

  // Logout function
  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', { replace: true });
  }

  // Register function
	async function register(name, email, password) {
		const res = await axios.post('http://localhost:1975/api/auth/register', { name, email, password });
		localStorage.setItem('token', res.data.token);
		await fetchProfile(res.data.token);
		navigate('/', { replace: true });
	}

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}