'use client';
import { Provider } from "react-redux";
import { store } from "./store";
import { ClientLayout } from "@/container/clientLayout";

export const ClientProviders = ({children}) => {
  return(
    <Provider store={store}>
      <ClientLayout>
        {children}
      </ClientLayout>
    </Provider>
  );
};