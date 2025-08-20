import { AppStore } from '../types';

// Atomic selectors for cart state
export const selectCartItems = (state: AppStore) => state.cart.cart.items;
export const selectCartCount = (state: AppStore) => state.cart.cart.count;
export const selectCartTotal = (state: AppStore) => state.cart.cart.total;

// Selector for getting specific item quantity
export const selectCartItemQuantity = (productId: string) => (state: AppStore) => {
  const item = state.cart.cart.items.get(productId);
  return item?.quantity || 0;
};

// Selector for getting specific cart item
export const selectCartItem = (productId: string) => (state: AppStore) => {
  return state.cart.cart.items.get(productId);
};

// Selector for cart item existence
export const selectIsInCart = (productId: string) => (state: AppStore) => {
  return state.cart.cart.items.has(productId);
};

// Actions selectors
export const selectAddToCart = (state: AppStore) => state.cart.addToCart;
export const selectUpdateQuantity = (state: AppStore) => state.cart.updateQuantity;
export const selectClearCart = (state: AppStore) => state.cart.clearCart;

// Composite selectors
export const selectCartSummary = (state: AppStore) => ({
  count: state.cart.cart.count,
  total: state.cart.cart.total,
  isEmpty: state.cart.cart.count === 0,
});

// Helper hook for cart actions
export const selectCartActions = (state: AppStore) => ({
  addToCart: state.cart.addToCart,
  updateQuantity: state.cart.updateQuantity,
  clearCart: state.cart.clearCart,
});