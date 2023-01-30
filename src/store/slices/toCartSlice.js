import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userID: null,
   itemID: null,
   itemImg: null,
   itemName: null,
   itemDescr: null,
   itemPrice: null,
   itemQuantity: null,
};

const toCartSlice = createSlice({
   name: "toCart",
   initialState,
   reducers: {
      setToCart(state, action) {
         state.userID = action.payload.userID;
         state.itemID = action.payload.itemID;
         state.itemImg = action.payload.itemImg;
         state.itemName = action.payload.itemName;
         state.itemDescr = action.payload.itemDescr;
         state.itemPrice = action.payload.itemPrice;
         state.itemQuantity = action.payload.itemQuantity;
      },
      setitemQuantity(state, action) {
         state.itemQuantity = action.payload.itemQuantity;
      },
   },
});

export const { setToCart, setitemQuantity } = toCartSlice.actions;
export default toCartSlice.reducer;
