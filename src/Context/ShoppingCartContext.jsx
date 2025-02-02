import { createContext, useState } from "react";
export const ShoppingCartContext = createContext("");

const test = "Test";

export function ShoppingCartContextProvider(props) {
  return (
    <ShoppingCartContext.Provider value={{ test }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
