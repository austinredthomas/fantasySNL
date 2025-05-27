import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navItems = [
  { name: 'Home',			to: '/' },
  { name: 'Leaderboard',   to: '/leaderboard' }, // This is a placeholder, adjust as needed
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Fantasy SNL</h2>
      </div>
      
      <ul className="navbar-links">
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-auth">
        {user ? (
          <button onClick={logout} className="nav-link button-link">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login"    className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}