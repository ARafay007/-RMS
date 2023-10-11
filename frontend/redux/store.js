import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from './states/loggedInUser';
import clientReducer from './states/clientStates';

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    clientState: clientReducer
  }
});