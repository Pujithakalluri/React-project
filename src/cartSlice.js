import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {

    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // ✅ INCREMENT
    incrementQuantity: (state, action) => {
      const item = state.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ DECREMENT
   incrementQuantity: (state, action) => {
  const item = state.find((item) => item.id === action.payload);
  if (item) {
    item.quantity += 1;
  }
},

decrementQuantity: (state, action) => {
  const item = state.find((item) => item.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
},

    clearCart: () => {
      return [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

