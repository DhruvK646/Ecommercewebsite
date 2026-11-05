import { createContext, use, useContext, useEffect, useMemo, useState } from "react";
import { NavbarData, CategoryData, FooterData } from "../Component/Data/ContentData";
import data from '../Component/Data/Data.json'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {



    const [products, setProducts] = useState(data)
    const [search, setSearch] = useState('')
    const [debounching, setDebounching] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounching(search)
            console.log("Debounced Search:", search);

        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [search])

    const searchFiter = useMemo(() => {
        return products.filter((product) =>
            product.title?.toLowerCase().includes(debounching.toLowerCase())
        )
    }, [debounching, products])


    return (
        <CartContext.Provider
            value={{
                NavbarData,
                CategoryData,
                FooterData,
                searchFiter,
                search,
                setSearch,
                debounching
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useProduct() {
    return useContext(CartContext)
}