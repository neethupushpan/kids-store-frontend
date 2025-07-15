// src/redux/selectors/cartSelectors.js
import { createSelector } from 'reselect';

const selectItemsByUser = (state) => state.cart.itemsByUser;
const selectCurrentUserId = (state) => state.user.currentUser?._id;

export const selectCartItemsForCurrentUser = createSelector(
  [selectItemsByUser, selectCurrentUserId],
  (itemsByUser, userId) => {
    return itemsByUser?.[userId] || [];
  }
);
