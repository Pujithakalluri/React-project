import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    placeOrder: (state, action) => {
      state.push({
        id: Date.now(),        // unique order id
        items: action.payload,
        date: new Date().toLocaleString(),
      });
    },
  },
});

export const { placeOrder } = orderSlice.actions; // ✅ match Cart.jsx
export default orderSlice.reducer;