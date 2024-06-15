'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({})

export default function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls) {
      const cart = ls.getItem('cart');
      setCartProducts(cart ? JSON.parse(cart) : []);
    }
  }, [ls]);


  function clearCart() {
    setCartProducts([])
    saveCartProductsToLocalStorage([])
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
      saveCartProductsToLocalStorage(newCartProducts)
      return newCartProducts
    })
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProducts = { ...product, size, extras }
      const newProducts = [...prevProducts, cartProducts];
      saveCartProductsToLocalStorage(newProducts)
      return newProducts
    })
  }
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
