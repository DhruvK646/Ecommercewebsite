import { createContext, useContext, useMemo, useState } from "react";
import { NavbarData, CategoryData, FooterData } from "../Component/Data/ContentData";
import data from '../Component/Data/Data.json'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    

    const [products, setProducts] = useState(data)
    const [search, setSearch] = useState('')

    const searchFiter = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, products])


    return (
        <CartContext.Provider
            value={{
                NavbarData,
                CategoryData,
                FooterData,
                searchFiter,
                search,
                setSearch
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useProduct() {
    return useContext(CartContext)
}