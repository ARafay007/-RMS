'use client';
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store";
import { ShopLayout } from "@/container/shopLayout";

export const Providers = ({children}) => {
  return(
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ShopLayout>
          {children}
        </ShopLayout>
      {/* </PersistGate> */}
    </Provider>
  );
};