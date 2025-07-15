import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaSignOutAlt
} from 'react-icons/fa';

const SellerSidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'bg-purple-800' : '';

  return (
    <div className="w-64 h-screen bg-[#ed54a4] text-white fixed top-0 left-0 shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-white-700">
        Seller Panel
      </div>
      <nav className="flex flex-col mt-4 space-y-1 px-4">
        <Link
          to="/seller/dashboard"
          className={`flex items-center space-x-2 px-3 py-2  hover:text-pink-200 ${isActive('/seller/dashboard')}`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/seller/products"
          className={`flex items-center space-x-2 px-3 py-2   hover:text-pink-200 ${isActive('/seller/products')}`}
        >
          <FaBoxOpen />
          <span>My Products</span>
        </Link>
        <Link
          to="/seller/add-product"
          className={`flex items-center space-x-2 px-3 py-2  hover:text-pink-200 ${isActive('/seller/add-product')}`}
        >
          <FaPlusCircle />
          <span>Add Product</span>
        </Link>
        <Link
          to="/seller/orders"
          className={`flex items-center space-x-2 px-3 py-2 rounded hover:text-pink-200 ${isActive('/seller/orders')}`}
        >
          <FaShoppingCart />
          <span>Orders</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center space-x-2 px-3 py-2  hover:text-pink-200 mt-6"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default SellerSidebar;
