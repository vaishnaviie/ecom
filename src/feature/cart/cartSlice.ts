import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/interfaces";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "myCart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      //   state.cart.push({ ...action.payload, quantity: 1 });

      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseProductQuantity: (state, action: PayloadAction<number>) => {
      state.cart.map((item) =>
        item.id === action.payload ? (item.quantity = item.quantity + 1) : item
      );
    },

    decreaseProductQuantity: (state, action: PayloadAction<number>) => {
      state.cart.map((item) =>
        item.id === action.payload ? (item.quantity = item.quantity - 1) : item
      );
    },
  },
});

export const isProductInCartt =
  (productId?: number) => (state: { myCart: CartState }) => {
    if (!productId) return false;
    return state?.myCart.cart.some((item) => item.id === productId);
  };

export const {
  addToCart,
  removeFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
