import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userID: null,
   itemID: null,
   itemImg: null,
   itemName: null,
   itemDescr: null,
   itemPrice: null,
   itemQuantity: null,
   itemCategory: null,
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
         state.itemCategory = action.payload.itemCategory;
      },
      setitemQuantity(state, action) {
         state.itemQuantity = action.payload.itemQuantity;
      },
      removeToCart(state) {
         state.userID = null;
         state.itemID = null;
         state.itemImg = null;
         state.itemName = null;
         state.itemDescr = null;
         state.itemPrice = null;
         state.itemQuantity = null;
         state.itemCategory = null;
      },
   },
});

export const { setToCart, setitemQuantity, removeToCart } = toCartSlice.actions;
export default toCartSlice.reducer;
