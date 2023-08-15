import { configureStore } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
import loggedInUserReducer from './states/loggedInUser';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, loggedInUserReducer)

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer
    // loggedInUser: persistedReducer
  }
});

// export const persistor = persistStore(store);