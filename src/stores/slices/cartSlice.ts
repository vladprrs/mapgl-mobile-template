import type { StateCreator } from 'zustand';
import type { AppStore, CartSlice, CartItem } from '../types';

export const createCartSlice: StateCreator<AppStore, [['zustand/immer', never]], [], CartSlice> = (set) => ({
  cart: {
    items: new globalThis.Map<string, CartItem>(),
    total: 0,
    count: 0
  },
  
  addToCart: (product: Omit<CartItem, 'quantity'>) => set((state) => {
    const newItems = new globalThis.Map(state.cart.cart.items);
    const existing = newItems.get(product.productId);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      newItems.set(product.productId, {
        ...product,
        quantity: 1
      });
    }
    
    state.cart.cart.items = newItems;
    state.cart.cart.total = state.cart.cart.total + product.price;
    state.cart.cart.count = state.cart.cart.count + 1;
  }),
  
  updateQuantity: (productId: string, quantity: number) => set((state) => {
    const newItems = new globalThis.Map(state.cart.cart.items);
    const item = newItems.get(productId);
    
    if (!item) return;
    
    const diff = quantity - item.quantity;
    
    if (quantity <= 0) {
      newItems.delete(productId);
    } else {
      item.quantity = quantity;
    }
    
    state.cart.cart.items = newItems;
    state.cart.cart.total = state.cart.cart.total + (diff * item.price);
    state.cart.cart.count = state.cart.cart.count + diff;
  }),
  
  clearCart: () => set((state) => {
    state.cart.cart.items = new globalThis.Map();
    state.cart.cart.total = 0;
    state.cart.cart.count = 0;
  })
});