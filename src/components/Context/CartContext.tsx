"use client"
import { CartResponse } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => void,
}>({
    cartData: null,
    setCartData: () => {},
    isLoading: false,
    setIsLoading: () => {},
    getCart() {},
});

import React from 'react'

export default function CartContextProvider({children} : {children: React.ReactNode}) {

    const [cartData, setCartData] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>('');

    async function getCart() {
        const response = await fetch('/api/get-cart');
        const data: CartResponse = await response.json();
        setCartData(data);
        if (data && data.data && data.data.cartOwner) {
            localStorage.setItem('userId', data.data.cartOwner);
        }
        setIsLoading(false);
        console.log(data);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getCart();
        }
    }, [])

  return (
    <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}>
        {children}
    </CartContext.Provider>
  )
}
