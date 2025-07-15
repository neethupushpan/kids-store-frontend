import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import API from '../../api/axios'; // or wherever your Axios instance is

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      }
    };

    if (user && user.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome, {user.name}! Here's your admin panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white shadow rounded">Total Users: {stats.totalUsers}</div>
        <div className="p-4 bg-white shadow rounded">Total Orders: {stats.totalOrders}</div>
        <div className="p-4 bg-white shadow rounded">Total Products: {stats.totalProducts}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
