import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
// FIX: Import `CartIcon` to resolve usage error.
import { PlusIcon, MinusIcon, ArrowLeftIcon, Share2Icon, MegaphoneIcon, BadgePercentIcon, ChevronDownIcon, TruckIcon, CircleDollarSignIcon, CartIcon } from './icons';
import { ProductCarousel } from './ProductCarousel';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, allProducts, onProductClick }) => {
  const { cartItems, updateQuantity } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 5);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const pricePerGram = product.weight ? (product.price / product.weight).toFixed(2).replace('.', ',') : null;
  const cartQuantity = cartItems[product.id] || 0;

  const handleAddToCart = () => {
    updateQuantity(product.id, cartQuantity + localQuantity);
  };
  
  const handleIncrease = () => {
    // Assuming max 8 units from info card
    if (localQuantity < 8) setLocalQuantity(localQuantity + 1);
  };
  
  const handleDecrease = () => {
    if (localQuantity > 1) setLocalQuantity(localQuantity - 1);
  };


  return (
    <div className="bg-white min-h-full">
      <div className="px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-800 font-bold text-lg">
          <ArrowLeftIcon className="w-6 h-6" /> Volver
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-3 pt-1">
                    <button className="flex items-center gap-2 text-[#ED1F69] font-semibold text-sm">
                        <MegaphoneIcon className="w-5 h-5" /> Reportar precio alto
                    </button>
                    <button className="flex items-center gap-2 text-[#68A500] font-semibold text-sm">
                        <Share2Icon className="w-5 h-5" /> Compartir
                    </button>
                </div>
                 {product.discount && (
                    <div className="absolute top-0 right-0 w-[4rem] h-[3.5rem] flex items-center justify-center rounded-lg bg-[#FF3025] text-white text-lg font-extrabold shadow-md">
                        -{product.discount}%
                    </div>
                )}
            </div>
            
            <div className="flex justify-center items-center h-56 mb-4">
                <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>

            {product.stock && product.stock < 10 && (
                <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <CartIcon className="w-5 h-5 text-[#2B5DDD]" />
                    <span>¡Apúrate! Quedan pocas unidades.</span>
                </div>
            )}
        </div>
      </div>
      
      <div className="px-4 space-y-3 pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        
        {product.discount && savings > 0 && (
            <div className="flex items-center text-sm text-red-600 font-bold">
                <BadgePercentIcon className="w-4 h-4 mr-1" />
                <span>-{product.discount}% Ahorras: {formatCurrency(savings)}</span>
                <span className="text-gray-600 font-medium ml-1">/paquete de {product.weight}{product.unit}</span>
            </div>
        )}

        <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
            {product.oldPrice && <p className="text-lg text-gray-500 line-through">{formatCurrency(product.oldPrice)}</p>}
        </div>

        {pricePerGram && <p className="text-sm text-gray-500">Precio por gr. ${pricePerGram}</p>}
      </div>

      <div className="px-4 py-4 space-y-3">
        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
            <div className="bg-gray-200 p-2 rounded-full">
                <TruckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <p className="font-bold text-sm">Hasta 8 unidades por entrega</p>
                <p className="text-xs text-gray-600">Puedes comprar una cantidad limitada de este producto por entrega.</p>
            </div>
        </div>
         <div className="bg-lime-50 p-3 rounded-lg flex items-center gap-3">
            <div className="bg-lime-100 p-2 rounded-full">
                <CircleDollarSignIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
                <p className="font-bold text-sm">Te regresamos tu dinero si un producto no es de tu satisfacción.</p>
                <a href="#" className="text-xs text-green-700 font-semibold hover:underline">Más info</a>
            </div>
        </div>
      </div>


      <div className="px-4 py-4 border-t border-b">
        <button onClick={() => setIsInfoOpen(!isInfoOpen)} className="w-full flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-800">Información adicional</h2>
            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isInfoOpen ? 'rotate-180' : ''}`} />
        </button>
        {isInfoOpen && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
                La palta Hass es conocida por su piel rugosa que cambia de verde a un morado oscuro cuando está madura. Su pulpa es cremosa, de color verde pálido y con un sabor rico y anuezado. Es perfecta para guacamole, ensaladas, tostadas o como un acompañamiento saludable.
            </p>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <ProductCarousel 
            title="Te puede interesar" 
            products={relatedProducts} 
            onProductClick={onProductClick}
        />
      </div>

      <div className="h-28"></div> 
      
      <div className="fixed bottom-0 w-full bg-white px-4 py-3 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center gap-3">
        <div className="flex-shrink-0">
            <p className="text-xs text-gray-600">1 paquete de {product.weight}{product.unit}</p>
            <p className="font-bold text-lg text-gray-900">{formatCurrency(product.price * localQuantity)}</p>
        </div>
        <div className="flex-1 flex items-center justify-center gap-[0.35rem] bg-pink-50 rounded-full p-1">
            <button onClick={handleDecrease} className="text-orange-600 p-2 rounded-full disabled:text-gray-300" disabled={localQuantity <= 1}><MinusIcon className="w-6 h-6"/></button>
            <span className="font-bold text-xl text-orange-600 w-8 text-center select-none">{localQuantity}</span>
            <button onClick={handleIncrease} className="text-orange-600 p-2 rounded-full disabled:text-gray-300" disabled={localQuantity >= 8}><PlusIcon className="w-6 h-6"/></button>
        </div>
        <button onClick={handleAddToCart} className="bg-[#FF6F00] text-white font-bold py-3 px-6 rounded-full text-base hover:bg-orange-600 transition-colors">
            Agregar
        </button>
      </div>

    </div>
  );
};