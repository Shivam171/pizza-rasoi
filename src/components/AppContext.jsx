'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price
    }
  }
  return price;
}

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

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
      saveCartProductsToLocalStorage(newCartProducts)
      return newCartProducts
    })
    toast.success('Item removed from cart!')
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart, cartProductPrice
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}