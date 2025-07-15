import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-2">❌ Payment Canceled</h1>
      <p className="mb-4">Your payment was not completed. You can try again anytime.</p>
      <button
        onClick={() => navigate('/cart')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default PaymentCancel;
