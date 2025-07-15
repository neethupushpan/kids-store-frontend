import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state?.orderId) {
      setOrderDetails(location.state);
      localStorage.removeItem('lastOrder');
    } else {
      const backup = localStorage.getItem('lastOrder');
      if (backup) {
        setOrderDetails(JSON.parse(backup));
        localStorage.removeItem('lastOrder');
      }
    }
  }, [location.state]);

  if (!orderDetails) {
    return (
      <MainLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-red-600">❌ No order found</h2>
          <button onClick={() => navigate('/')} className="text-blue-600 mt-4 underline">Back to Home</button>
        </div>
      </MainLayout>
    );
  }

  const { orderId, totalAmount, shippingAddress, items = [] } = orderDetails;

  const shipping = 50;
  const tax = ((totalAmount * 100) / 105) * 0.05; // extract tax from total
  const subtotal = totalAmount - tax - shipping;

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-10 text-center text-green-600">✅ Payment Successful!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Info */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3 text-pink-600">Order Information</h2>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
                <div>
                  <p className="font-semibold">Shipping Address:</p>
                  <p>{shippingAddress?.fullName}</p>
                  <p>{shippingAddress?.street}, {shippingAddress?.city}</p>
                  <p>{shippingAddress?.state} - {shippingAddress?.pincode}</p>
                  <p>Phone: {shippingAddress?.phone}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-600">Items in Your Order</h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.product?.image || "/placeholder.jpg"}
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-4 text-pink-600">Payment Summary</h2>
              <div className="text-gray-700 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-base font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3 text-pink-600">Payment Method</h2>
              <p className="text-gray-700 text-sm">Razorpay / UPI / Card</p>
            </div>

            <div className="p-6 bg-gray-50 text-center">
              <button
                onClick={() => navigate('/my-orders')}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;
