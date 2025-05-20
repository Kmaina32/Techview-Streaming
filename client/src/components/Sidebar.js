import React, { useState } from 'react';
import { FaHome, FaUpload, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  { name: 'Upload', icon: <FaUpload />, path: '/upload' },
  { name: 'Profile', icon: <FaUser />, path: '/profile' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen flex flex-col transition-width duration-300 ${collapsed ? 'w-16' : 'w-48'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Real Talk</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>
      <nav className="flex-1 mt-4">
        {menuItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            <span className="text-xl">{icon}</span>
            {!collapsed && <span>{name}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full hover:bg-gray-700 px-4 py-3 rounded transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
