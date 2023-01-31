import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import itemReducer from "./slices/itemSlice";
import toCartReducer from "./slices/toCartSlice";
import toOrderSlice from "./slices/toOrderSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      item: itemReducer,
      toCart: toCartReducer,
      toOrder: toOrderSlice,
   },
});
