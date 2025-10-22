import React from 'react';
import { PromoBanner } from '../types';

interface PromoCarouselProps {
    banners: PromoBanner[];
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ banners }) => {
    return (
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide pl-4">
            {banners.map((banner, index) => (
                <div key={index} className="flex-shrink-0 w-[244px] h-40 rounded-lg overflow-hidden shadow-md cursor-pointer">
                    <img
                        src={banner.imageUrl}
                        alt={banner.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
};