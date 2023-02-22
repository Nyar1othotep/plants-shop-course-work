import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   orderId: null,
};

const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {
      setOrderId(state, action) {
         state.orderId = action.payload.orderId;
      },
   },
});

export const { setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
