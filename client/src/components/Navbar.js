import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-4 shadow-lg">
      <div className="text-xl font-serif font-bold text-white select-none">Real Talk</div>
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="text-orange-400 hover:text-teal-400 focus:outline-none transition-colors duration-300"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
