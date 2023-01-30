import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import itemReducer from "./slices/itemSlice";
import toCartReducer from "./slices/toCartSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      item: itemReducer,
      toCart: toCartReducer,
   },
});
