export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface PromoBanner {
  imageUrl: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  unit?: string;
  weight?: number; // in grams
  stock?: number;
  categoryId: number;
}

export interface Brand {
  name: string;
  logoUrl: string;
}