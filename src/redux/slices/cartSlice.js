// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const initialState = {
  cartItems: savedCart,
  totalAmount: calculateTotal(savedCart),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === product._id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
