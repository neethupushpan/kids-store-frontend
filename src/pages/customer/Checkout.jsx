import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { clearCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import MainLayout from '../../layouts/MainLayout';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.currentUser);

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shippingAddress'));
    if (saved) setAddress(saved);
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Pricing breakdown
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50;
  const tax = subtotal * 0.05;
  const finalAmount = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!user) return toast.error("Please login to continue");
    if (cartItems.length === 0) return toast.error("Cart is empty");

    const isEmpty = Object.values(address).some((val) => val.trim() === '');
    if (isEmpty) return toast.error("Please fill in all shipping details");

    try {
      localStorage.setItem('shippingAddress', JSON.stringify(address));

      const { data } = await API.post('/payment/create-order', { amount: finalAmount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Kids Online Store",
        description: "Payment for your order",

        handler: async function (response) {
          const verifyRes = await API.post(
            '/payment/verify-payment',
            {
              ...response,
              cartItems,
              totalAmount: finalAmount,
              shippingAddress: address,
            },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          if (verifyRes.data.success) {
            const items = cartItems.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            }));

            const orderRes = await API.post(
              '/orders/place',
              {
                items,
                totalAmount: finalAmount,
                paymentInfo: response,
                shippingAddress: address,
              },
              {
                headers: { Authorization: `Bearer ${user.token}` },
              }
            );

            dispatch(clearCart());
            toast.success("Order placed successfully!");

            localStorage.setItem('lastOrder', JSON.stringify({
              orderId: orderRes.data.orderId,
              totalAmount: finalAmount,
              shippingAddress: address,
            }));

            navigate('/payment-success', {
              state: {
                orderId: orderRes.data.orderId,
                totalAmount: finalAmount,
                shippingAddress: address,
              },
            });
          } else {
            toast.error("Payment verification failed.");
          }
        },

        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Checkout error:", err);
      toast.error("Checkout failed. Try again.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🏠 Shipping Address */}
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <form className="space-y-3">
            {['fullName', 'phone', 'street', 'city', 'state', 'pincode'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={address[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ))}
          </form>
        </div>

        {/* 🛍️ Order Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-4 space-y-2 border-t pt-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 text-base">
              <span>Total:</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white py-2 rounded"
          >
            Pay ₹{finalAmount.toFixed(2)}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
