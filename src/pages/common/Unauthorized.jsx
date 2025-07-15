import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <a
        href="/"
        className="text-blue-600 hover:underline text-base"
      >
        Return to Home
      </a>
    </div>
  );
};

export default Unauthorized;
