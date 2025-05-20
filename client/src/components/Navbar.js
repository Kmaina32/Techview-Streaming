import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow">
      <div className="text-xl font-bold text-gray-800 dark:text-white">Real Talk</div>
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="text-gray-800 dark:text-white focus:outline-none"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
