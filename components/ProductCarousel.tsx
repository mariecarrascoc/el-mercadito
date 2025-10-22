import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onViewAllClick?: () => void;
  onProductClick?: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onViewAllClick, onProductClick }) => {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-[1.1rem] font-bold text-gray-800">{title}</h2>
        {onViewAllClick && (
          <button 
            onClick={onViewAllClick} 
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            Ver todos
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onProductClick} />
        ))}
      </div>
    </section>
  );
};