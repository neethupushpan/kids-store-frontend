import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/slices/cartSlice';

import { useEffect, useState } from 'react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Fetch cart on page load if user is logged in


  // ✅ Recalculate total when cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  if (!user) {
    return (
      <MainLayout>
        <p className="text-center p-6">Please login to view your cart.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-start border-b py-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600 mb-1">Category: {item.category}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      Sizes: {Array.isArray(item.size) ? item.size.join(', ') : item.size}
                    </p>
                    <p className="text-green-700 font-semibold">₹{item.price}</p>

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="px-2 py-1 bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-3 border-y">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="px-2 py-1 bg-gray-200 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="mt-2 text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-bold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
              <button
  onClick={() => {
    console.log("🛒 Proceeding to Checkout with cartItems:", cartItems);
    console.log("💰 Total Amount:", totalPrice);
    navigate('/checkout', { state: { amount: totalPrice } });
  }}
  className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white px-4 py-2 mt-4 rounded"
>
  Proceed to Checkout
</button>

            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
