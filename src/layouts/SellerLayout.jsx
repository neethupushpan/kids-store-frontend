import React from 'react';
import SellerSidebar from '../components/seller/SellerSidebar';
import { Outlet } from 'react-router-dom';

const SellerLayout = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
