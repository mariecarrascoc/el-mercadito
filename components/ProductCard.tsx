import React from 'react';
import { Product } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './icons';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { cartItems, updateQuantity } = useCart();
  const quantity = cartItems[product.id] || 0;

  const handleCardClick = () => {
    if (onClick) {
        onClick(product);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between w-44 flex-shrink-0">
      <div onClick={handleCardClick} className="cursor-pointer">
        <div className="relative">
            <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-32 object-cover"
            />
            {product.discount && (
                <div className="absolute top-0 right-3 w-[2.8rem] rounded-b-md bg-[#FF3025] text-white text-xs font-extrabold text-center pt-4 px-[0.2rem] pb-2">
                    -{product.discount}%
                </div>
            )}
        </div>
        
        <div className="p-3 pt-2 pb-1 flex-grow flex flex-col">
            <div className="flex items-baseline gap-2 mb-[0.3rem]">
                <p className={`text-lg font-semibold ${product.discount ? 'text-[#FF3025]' : 'text-gray-900'}`}>{formatCurrency(product.price)}</p>
                {product.oldPrice && (
                    <p className="text-sm text-gray-500 line-through">{formatCurrency(product.oldPrice)}</p>
                )}
            </div>

            <h3 className="text-base font-bold text-gray-800 mb-[0.3rem] flex-grow h-6 line-clamp-2 leading-tight">{product.name}</h3>
            <p className="text-xs text-gray-500 mb-[0.3rem]">{product.description}</p>
        </div>
      </div>

      <div className="px-3 pb-3">
        {quantity === 0 ? (
          <button 
            onClick={() => updateQuantity(product.id, 1)}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition-colors text-base"
          >
            Agregar
          </button>
        ) : (
          <div className="flex items-center justify-between border border-[#00904B] text-[#00904B] rounded-full">
            <button 
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label={quantity === 1 ? "Eliminar producto" : "Disminuir cantidad"}
              className="p-2 hover:text-red-500"
            >
              {quantity === 1 ? <TrashIcon className="w-6 h-6" /> : <MinusIcon className="w-6 h-6" />}
            </button>
            <span className="font-bold select-none">{quantity}</span>
            <button 
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Aumentar cantidad"
              className="p-2 hover:text-green-700"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
