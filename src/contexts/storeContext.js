import React, { createContext } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const value = {
    test: "hello world",
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
