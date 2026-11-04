import { createContext, useContext, useState } from "react";
import { NavbarData , CategoryData, FooterData} from "../Component/Data/ContentData";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

     
    return (
        <CartContext.Provider
            value={{
                NavbarData,
                CategoryData,
                FooterData
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useProduct() {
    return useContext(CartContext)
}