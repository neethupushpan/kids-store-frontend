import React from 'react';
import { useSelector } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
//import { logoutUser } from '../../redux/slices/userSlice';



const SellerDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  //const dispatch = useDispatch();
 // const navigate = useNavigate();


  return (
  
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user?.name || 'Seller'} 👋
            </h1>

          </div>

          <p className="text-gray-700 mb-4">
            You are logged in as a <strong>{user?.role}</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold">My Products</h2>
              <p className="text-sm text-gray-600">View and manage your listed items.</p>
            </div>

            <div className="bg-green-100 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold">Add New Product</h2>
              <p className="text-sm text-gray-600">Upload and publish new stock.</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="text-sm text-gray-600">Track customer orders and delivery status.</p>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default SellerDashboard;
