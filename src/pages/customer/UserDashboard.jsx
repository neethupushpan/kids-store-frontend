import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';

const UserDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    console.log("📦 Dashboard Redux user:", user);
  }, [user]);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/devsa5tma/image/upload/v1751504909/bg_oprgqz.jpg')`,
      }}
    >
      <div className="max-w-3xl mx-auto  rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          Welcome, {user?.name}!
        </h2>
        <p className="text-gray-600 mb-6">
          Here are your personal details:
        </p>

        <div className="grid gap-4 text-gray-800">
          <div>
            <span className="font-semibold">Full Name:</span> {user?.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user?.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{' '}
          {user?.phone?.trim() ? user.phone : 'Not provided'}

          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Want to update your info? Click{' '}
            <a href="/user/profile" className="text-pink-600 underline">
              Edit Profile
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
