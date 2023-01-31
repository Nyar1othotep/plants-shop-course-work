import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userUID: null,
   orderArray: null,
   country: null,
   office: null,
   index: null,
   firstAndLastName: null,
   phone: null,
   date: null,
   time: null,
   status: null,
};

const toOrderSlice = createSlice({
   name: "toOrder",
   initialState,
   reducers: {
      setToOrder(state, action) {
         state.userUID = action.payload.userUID;
         state.orderArray = action.payload.orderArray;
      },
      setToDelivery(state, action) {
         state.country = action.payload.country;
         state.office = action.payload.office;
         state.index = action.payload.index;
         state.firstAndLastName = action.payload.firstAndLastName;
         state.phone = action.payload.phone;
         state.date = action.payload.date;
         state.time = action.payload.time;
         state.status = action.payload.status;
      },
      removeToOrderAndDelivery(state) {
         state.userUID = null;
         state.orderArray = null;
         state.country = null;
         state.office = null;
         state.index = null;
         state.firstAndLastName = null;
         state.phone = null;
         state.date = null;
         state.time = null;
         state.status = null;
      },
   },
});

export const { setToOrder, setToDelivery, removeToOrderAndDelivery } = toOrderSlice.actions;
export default toOrderSlice.reducer;
