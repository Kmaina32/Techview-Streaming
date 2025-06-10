import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMic, FiMusic, FiCast, FiInfo, FiMail } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <aside className="sidebar bg-gray-900 text-white h-full fixed top-0 left-0 p-4 w-20 md:w-64 transition-all duration-300">
      <h2 className="logo text-xl md:text-2xl font-bold mb-6 hidden md:block">Techview TV</h2>
      <ul className="nav-links space-y-4">
        <li>
          <Link to="/" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiHome className="text-xl" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/podcast" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiMic className="text-xl" />
            <span className="hidden md:inline">Podcast</span>
          </Link>
        </li>
        <li>
          <Link to="/playlist" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiMusic className="text-xl" />
            <span className="hidden md:inline">Playlist</span>
          </Link>
        </li>
        <li>
          <Link to="/livestream" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiCast className="text-xl" />
            <span className="hidden md:inline">LiveStream</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiInfo className="text-xl" />
            <span className="hidden md:inline">About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="flex items-center space-x-2 hover:text-yellow-400">
            <FiMail className="text-xl" />
            <span className="hidden md:inline">Contact</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
