import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   id: null,
   category: null,
};

const itemSlice = createSlice({
   name: "item",
   initialState,
   reducers: {
      setItemId(state, action) {
         state.id = action.payload.id;
      },
      setItemCategory(state, action) {
         state.category = action.payload.category;
      },
   },
});

export const { setItemId, setItemCategory } = itemSlice.actions;
export default itemSlice.reducer;
