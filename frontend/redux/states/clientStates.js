import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 'idle',
  restaurantMenu: {},
}

export const clientStates = createSlice({
  name: 'clientState',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setRestaurantMenu: (state, action) => {
      state.status = action.payload.status;
      state.restaurantMenu = action.payload.data;
    }
  }
});

export const {setStatus, setRestaurantMenu} = clientStates.actions;

export default clientStates.reducer;