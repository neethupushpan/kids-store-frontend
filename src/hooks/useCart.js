import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} from '../redux/slices/cartSlice'; // ✅ adjust path if needed

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return {
    cartItems,
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
    increaseQuantity: (id) => dispatch(increaseQuantity(id)),
    decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
  };
};
