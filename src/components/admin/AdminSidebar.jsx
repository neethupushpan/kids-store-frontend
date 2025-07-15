import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaShoppingCart, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#ed54a4] text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-white-700">
        Admin Panel
      </div>
      <nav className="flex flex-col mt-4 space-y-2 px-4">
        <Link to="/admin/dashboard" className="flex items-center space-x-2  hover:text-pink-200 px-3 py-2 ">
          <FaTachometerAlt /> <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="flex items-center space-x-2 hover:text-pink-200 px-3 py-2">
          <FaUsers /> <span>Manage Users</span>
        </Link>
        <Link to="/admin/products" className="flex items-center space-x-2  hover:text-pink-200 px-3 py-2 ">
          <FaBox /> <span>Manage Products</span>
        </Link>
        <Link to="/admin/orders" className="flex items-center space-x-2  hover:text-pink-200 px-3 py-2">
          <FaShoppingCart /> <span>Manage Orders</span>
        </Link>
      
        <Link to="/admin/add-seller" className="flex items-center space-x-2 hover:text-pink-200 px-3 py-2">
          <FaUserPlus /> <span>Add Seller</span>
        </Link>
        <Link to="/login" className="flex items-center space-x-2  hover:text-pink-200 mt-4 px-3 py-2 ">
          <FaSignOutAlt /> <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
