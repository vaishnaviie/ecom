import type { ReactNode } from "react";

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
  returnPolicy?: string;
  warrantyInformation?: string;
  weight?: number;
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

// export interface FilteredItemInterface {
//   id?: number;
//   title?: string;
//   category?: string;
//   brand?: string;
//   productName?: string;
//   categoryName?: string;
//   brandName?: string;
//   tag?: string;
// }

export interface FilteredItemInterface extends Product {
  productName?: string;
  brandName?: string;
  categoryName?: string;
  tag?: "category" | "brand";
}

export interface SearchInterface {
  searchInput: string;
  onInputChange: (value: string) => void;
  showSuggestions: boolean;
  filteredProducts: FilteredItemInterface[];
}

export interface SearchSuggestionsINterface {
  showSuggestions: boolean;
  searchInput: string;
  filteredProducts: FilteredItemInterface[];
}

export interface MobViewHeaderInterface {
  isOpen: boolean;
  onClose: () => void;
}

export interface LayoutProps {
  children: ReactNode;
  // data: Product[];
  url: string;
}
