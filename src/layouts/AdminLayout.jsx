import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;