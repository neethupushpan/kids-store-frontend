import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserSuccess: (state, action) => {
      const updated = action.payload; // ✅ direct updated user object
      state.currentUser = { ...state.currentUser, ...updated };
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
  },
});

export const { setUser, logoutUser, updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;
