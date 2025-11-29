import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cartItems as mockItems } from "../../constants/cartItems";
import type { CartItem } from "../../constants/cartItems";

export interface CartState {
  cartItems: CartItem[];
  amount: number; // 전체 수량
  total: number; // 전체 금액
}

const initialState: CartState = {
  cartItems: mockItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    increase(state, action: PayloadAction<string>) {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem) {
        cartItem.amount += 1;
      }
    },
    decrease(state, action: PayloadAction<string>) {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (!cartItem) return;

      if (cartItem.amount <= 1) {
        // 1 아래로 내려가면 자동 제거
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        return;
      }
      cartItem.amount -= 1;
    },
    calculateTotals(state) {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
