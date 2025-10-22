import React from 'react';
import { Product, Brand } from '../types';
import { ProductCard } from './ProductCard';
import { BrandItem } from './BrandCarousel';
import { ArrowLeftIcon } from './icons';

interface GridViewProps {
  title: string;
  items: (Product | Brand)[];
  type: 'product' | 'brand';
  onBack: () => void;
  onProductClick?: (product: Product) => void;
}

export const GridView: React.FC<GridViewProps> = ({ title, items, type, onBack, onProductClick }) => {
  if (items.length === 0) {
    return (
        <div className="text-center p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-green-600 font-semibold mb-4">
                <ArrowLeftIcon className="w-5 h-5" />
                Volver
            </button>
            <p className="text-gray-500">No se encontraron resultados.</p>
        </div>
    );
  }

  return (
    <div className="p-4">
        <button onClick={onBack} className="flex items-center gap-2 text-green-600 font-semibold mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Volver
        </button>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {type === 'product' ? (
             <div className="grid grid-cols-2 gap-3">
                {(items as Product[]).map((product) => (
                    <ProductCard key={product.id} product={product} onClick={onProductClick} />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-3 gap-4">
                {(items as Brand[]).map((brand) => (
                    <BrandItem key={brand.name} brand={brand} />
                ))}
            </div>
        )}
    </div>
  );
};