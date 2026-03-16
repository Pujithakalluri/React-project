import { createSlice } from "@reduxjs/toolkit";

// Available coupons
const coupons = {
  SAVE10: 10,
  SAVE20: 20,
  FIRST50: 50,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },
  reducers: {
    applyCoupon: (state, action) => {
      const enteredCode = action.payload.toUpperCase();

      if (coupons[enteredCode]) {
        state.code = enteredCode;
        state.discount = coupons[enteredCode];
        state.applied = true;
        state.message = `Coupon "${enteredCode}" applied! You got ${coupons[enteredCode]}% off.`;
      } else {
        state.code = "";
        state.discount = 0;
        state.applied = false;
        state.message = "Invalid coupon code!";
      }
    },
    resetCoupon:(state) => {
      state.discount = 0;
      state.applied = false;
      state.message = "";
    }
  },
});

export const { applyCoupon, resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;