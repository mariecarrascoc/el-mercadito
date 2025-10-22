import React from 'react';
import { brands } from '../constants';
import { Brand } from '../types';

export const BrandItem: React.FC<{ brand: Brand }> = ({ brand }) => (
    <div className="flex flex-col items-center flex-shrink-0 w-[72px]">
        <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-md border overflow-hidden">
            <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-cover" />
        </div>
    </div>
);

interface BrandCarouselProps {
  onViewAllClick?: () => void;
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({ onViewAllClick }) => {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-[1.1rem] font-bold text-gray-800">Marcas aliadas</h2>
        <button 
            onClick={onViewAllClick} 
            className="text-sm font-semibold text-green-600 hover:text-green-700"
        >
          Ver todas
        </button>
      </div>
      <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide">
        {brands.map((brand) => (
          <BrandItem key={brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
};