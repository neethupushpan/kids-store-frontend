import React from 'react';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Seller Dashboard</h2>

        {user ? (
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
        ) : (
          <p className="text-red-500">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
