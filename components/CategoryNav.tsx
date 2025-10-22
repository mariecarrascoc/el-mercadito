import React from 'react';
import { categories } from '../constants';
import { Category } from '../types';

interface CategoryNavProps {
  onCategoryClick: (category: Category) => void;
}

const CategoryItem: React.FC<{ category: Category, onClick: () => void }> = ({ category, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center text-center space-y-2 flex-shrink-0 w-20 group">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl border border-gray-200 shadow-sm group-hover:shadow-md group-hover:border-green-400 transition-all duration-200">
      {category.icon}
    </div>
    <p className="text-xs font-bold text-gray-800 h-8 flex items-center justify-center group-hover:text-green-600 transition-colors">
      {category.name}
    </p>
  </button>
);


export const CategoryNav: React.FC<CategoryNavProps> = ({ onCategoryClick }) => {
  return (
    <section className="pt-4">
       <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} onClick={() => onCategoryClick(category)} />
        ))}
      </div>
    </section>
  );
};