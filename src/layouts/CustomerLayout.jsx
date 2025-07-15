import React from 'react';
import UserSidebar from '../pages/customer/UserSidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ path may vary
import Footer from '../components/Footer';
const CustomerLayout = () => {
  return (
    <>
      <Navbar />
    <div className="flex min-h-screen">
      <div className="w-64">
        <UserSidebar />
      </div>
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* Your actual page content will render here */}
      </div>
    </div>   <Footer />  </>
  );
};

export default CustomerLayout;
