// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

// 🔄 Fetch products by category and size
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, size }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/product?category=${category}&size=${size}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);
// Add this to productSlice.js
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// productSlice.js

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/product/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
    }
  }
);
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/product/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update product');
    }
  }
);
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
