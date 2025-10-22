

import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';
import { ArrowLeftIcon } from './icons';

interface CartViewProps {
  allProducts: Product[];
  onBack: () => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export const CartView: React.FC<CartViewProps> = ({ allProducts, onBack }) => {
  const { cartItems, totalItems } = useCart();

  const cartProductDetails = Object.keys(cartItems)
    .map(id => {
      const product = allProducts.find(p => p.id === parseInt(id));
      if (!product) return null;
      return { ...product, quantity: cartItems[parseInt(id)] };
    })
    .filter((p): p is Product & { quantity: number } => p !== null);

  const subtotal = cartProductDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cartProductDetails.reduce((sum, item) => {
    const savings = (item.oldPrice || item.price) - item.price;
    return sum + savings * item.quantity;
  }, 0);

  if (totalItems === 0) {
    return (
      <div className="p-4 bg-white min-h-screen">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-800 font-bold text-lg">
            <ArrowLeftIcon className="w-5 h-5" />
            Volver
        </button>
        <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-800">Tu carrito está vacío</h2>
            <p className="text-gray-600 mt-2">Agrega productos para verlos aquí.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-800 font-bold text-lg">
          <ArrowLeftIcon className="w-6 h-6" /> Volver
        </button>
      </div>

      <div className="px-4">
          {cartProductDetails.map(item => <CartItem key={item.id} item={item} />)}
      </div>
      
      <div className="px-4 py-4 space-y-2 mt-4">
          <div className="flex justify-between text-gray-700">
              <span>Ahorras</span>
              <span>{formatCurrency(totalSavings)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
          </div>
      </div>
      
      <div className="px-4 py-4">
        <div className="bg-lime-50 p-3 rounded-lg flex items-center gap-3 border border-lime-200">
             <img src="https://el-mercadito.co/_next/image?url=%2Fimgs%2Fdevolucion.png&w=64&q=75" alt="satisfaction guarantee" className="w-10 h-10" />
            <div>
                <p className="font-semibold text-sm text-green-900 leading-tight">Te regresamos tu dinero si un producto no es de tu satisfacción. Así de rápido y seguro. <a href="#" className="font-bold text-green-800 hover:underline">Más info</a></p>
            </div>
        </div>
      </div>

      <div className="h-28" />

      <div className="fixed bottom-0 w-full bg-white px-4 py-3 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <button className="w-full bg-[#FF6F00] text-white font-bold py-4 rounded-full text-lg hover:bg-orange-600 transition-colors flex justify-between items-center px-6">
            <span>Comprar</span>
            <span>{formatCurrency(subtotal)}</span>
        </button>
      </div>
    </div>
  );
};