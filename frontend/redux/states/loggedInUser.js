import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 'idle',
  value: {},
  error: null
};

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserDetails: (state, action) => {
      state.value = action.payload.data;
      state.status = action.payload.status;
    },
    updateMenu: (state, action) => {
      state.value.menu = action.payload.data;
      state.status = action.payload.status;
    }
  }
});

export const {setStatus, setUserDetails, updateMenu} = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;