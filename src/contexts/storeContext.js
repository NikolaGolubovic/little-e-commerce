import React, { createContext } from "react";

import { useThunkReducer } from "../hooks/thunk";
import { reducer } from "../reducer/storeReducer";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [products, dispatch] = useThunkReducer(reducer, {});
  const value = {
    cartQuantity: 0 || products.cartQuantity,
    dispatch,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
