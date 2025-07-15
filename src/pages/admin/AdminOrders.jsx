import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/all-orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await API.put(`/orders/update/${orderId}`, { status: newStatus });
      toast.success('✅ Status updated');
      // Refresh orders after update
      const updatedOrders = await API.get('/orders/all-orders');
      setOrders(updatedOrders.data);
    } catch (err) {
      console.error("❌ Status update failed", err.message);
      toast.error('Failed to update status');
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📦 Admin Order Management</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-xl p-5 border border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-blue-600">Order ID: {order._id}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">Customer:</label>
                  <p className="text-gray-800">{order?.user?.name || 'N/A'}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Email:</label>
                  <p className="text-gray-800">{order?.user?.email || 'N/A'}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Status:</label>
                  <p className="text-orange-500 font-semibold">{order.status}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Amount:</label>
                  <p className="text-gray-800">₹{order.totalAmount}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-600">Date:</label>
                  <p className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
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
               <div className="mt-4 flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Update Status:</label>
            <select
              className="border p-1 rounded"
              defaultValue={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
