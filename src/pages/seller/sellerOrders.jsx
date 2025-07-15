import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/seller-orders'); // 🔐 protected
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching seller orders:', err);
        toast.error('Failed to load seller orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📦 Seller Order Panel</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders placed for your products yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow p-5 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-blue-600">Order ID: {order._id}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                <div>
                  <label className="font-medium text-gray-600">Customer Name:</label>
                  <p className="text-gray-800">{order.user?.name || 'N/A'}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Email:</label>
                  <p className="text-gray-800">{order.user?.email || 'N/A'}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Total:</label>
                  <p className="text-gray-800">₹{order.totalAmount}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Date:</label>
                  <p className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Status:</label>
                  <p className="text-orange-500 font-semibold">{order.status}</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium text-gray-600">Items:</label>
                <ul className="list-disc ml-5 text-gray-800">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.product?.title || 'Product'} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
