import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
}

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.value = action.payload
    }
  }
});

export const {setUserDetails} = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;