import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar/Sadebar';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Navbar />
        <main
          className="flex-1 overflow-y-auto px-10 pt-4"
          style={{ scrollbarWidth: 'none' }} // Firefox uchun scrollni yashirish
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
