'use client';
import { Provider } from "react-redux";
import { store } from "./store";
import { ShopLayout } from "@/container/shopLayout";

export const ShopProviders = ({children}) => {
  return(
    <Provider store={store}>
      <ShopLayout>
        {children}
      </ShopLayout>
    </Provider>
  );
};