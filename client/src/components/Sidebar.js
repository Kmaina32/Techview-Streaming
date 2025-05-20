import React, { useState, useContext } from 'react';
import { FaHome, FaUpload, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const menuItems = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  { name: 'Profile', icon: <FaUser />, path: '/profile' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 text-white h-screen flex flex-col transition-width duration-300 shadow-lg ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {!collapsed && (
          <h1 className="text-xl font-serif tracking-wide select-none">Real Talk</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* User Avatar */}
      {user && (
        <div className="flex items-center gap-3 p-4 border-b border-indigo-700">
          <img
            src={user.avatar || 'https://i.pravatar.cc/40'}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          {!collapsed && (
            <span className="font-semibold truncate">{user.username}</span>
          )}
        </div>
      )}

      <nav className="flex-1 mt-4">
        {menuItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'hover:bg-orange-500 hover:text-white'
              }`
            }
            title={collapsed ? name : undefined}
          >
            <span className="text-2xl">{icon}</span>
            {!collapsed && <span className="font-serif">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Upload CTA Button */}
      <div className="p-4 border-t border-indigo-700">
        <NavLink
          to="/upload"
          className={`flex items-center justify-center gap-3 w-full rounded-md px-4 py-3 font-semibold transition-colors duration-200 ${
            collapsed
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
          title="Upload"
        >
          <FaUpload className="text-xl" />
          {!collapsed && <span>Upload</span>}
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full hover:bg-orange-500 hover:text-white rounded-md px-4 py-3 transition-colors duration-200"
          title="Logout"
        >
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
