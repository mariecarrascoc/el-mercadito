import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

// Define la forma del valor del contexto
interface CartContextType {
  cartItems: Record<number, number>; // { productId: quantity }
  updateQuantity: (productId: number, newQuantity: number) => void;
  totalItems: number;
}

// Crea el contexto con un valor por defecto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Crea el componente proveedor
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Record<number, number>>({
      14: 2, // Arroz Ala
      15: 1, // Arvejas Partidas
  });

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      const newCart = { ...prevItems };
      if (newQuantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQuantity;
      }
      return newCart;
    });
  };

  const totalItems = useMemo(() => {
    // FIX: Add explicit types to the reduce function arguments to resolve a TypeScript error.
    return Object.values(cartItems).reduce((sum: number, quantity: number) => sum + quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    updateQuantity,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Crea un hook personalizado para un consumo fácil del contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};