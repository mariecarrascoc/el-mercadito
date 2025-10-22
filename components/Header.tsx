
import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon, CartIcon, CloseIcon } from './icons';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onCartClick, onLogoClick }) => {
  const [placeholderText, setPlaceholderText] = useState('Buscar');
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTotalItems = useRef(totalItems);


  useEffect(() => {
    const placeholders = ['Buscar', '¿Qué necesitas?'];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400); // Duración de la animación
      return () => clearTimeout(timer);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);


  return (
    <header className="bg-[#008648] px-4 py-3 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-white" aria-label="Abrir menú">
            <MenuIcon className="w-7 h-7" />
          </button>
          <button onClick={onLogoClick} aria-label="Volver a la página de inicio">
            <img src="https://el-mercadito.co/imgs/newLogoM.svg" alt="Logo Mercadito" className="w-11 h-11" />
          </button>
        </div>
        <div className="flex-1 mx-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#008648] w-6 h-6 pointer-events-none" />
            <input
              type="text"
              placeholder={placeholderText}
              aria-label="Buscar productos"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white text-gray-800 rounded-full py-2 pl-12 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#008648] placeholder:text-[#008648]"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label="Limpiar búsqueda"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <button onClick={onCartClick} className="relative" aria-label={`Ver carrito de compras, ${totalItems} artículos`}>
          <CartIcon className="w-8 h-8" />
          <span className={`absolute -top-2 -right-2 bg-white text-[#008648] text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center ${isAnimating ? 'animate-subtle-bounce' : ''}`}>
            {totalItems}
          </span>
        </button>
      </div>
    </header>
  );
};