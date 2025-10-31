// types/product.types.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductCardInterface {
  title: string;
  images: string[];
  category: string;
  price: number;
  isRating?: boolean;
  rating?: number;
  isDiscountPercentage?: boolean;
  discountPercentage?: number;
  isBrand?: boolean;
  brand?: string;
  thumbnail?: string;
  isPrice?: boolean;
  isTitle?: boolean;
  isCategory?: boolean;
}

export interface CategoryItemInterface {
  id: number;
  title: string;
  images: string[];
  category: string;
  price: number;
}
