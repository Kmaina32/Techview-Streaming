// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <div className="hidden md:block md:w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 pb-16 md:pb-4">
        <Outlet />
      </div>

      {/* Bottom nav for mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
