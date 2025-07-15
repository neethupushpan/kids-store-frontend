import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import MainLayout from '../../layouts/MainLayout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders'); // Make sure auth token is set in axios
        setOrders(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, []);

  return (

   <div className="max-w-4xl mx-auto mt-10 p-6  rounded shadow">

      <h2 className="text-2xl text-black text-align-center font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-white-600">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border-b border-gray-200 py-4 mb-4"
          >
            <p className="text-lg font-semibold">Order ID: {order._id}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <div className="mt-2">
              {order.items.map((item) => (
               <div key={item.product?._id || item._id} className="ml-4 text-sm">

                  <p>
                    {item.product?.name || 'Product'} x {item.quantity}
                  </p>
                </div>
                
              ))}
              <div className="text-center mt-8">
  <button
    onClick={() => navigate('/')}
    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
  >
    Continue Shopping
  </button>
</div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
