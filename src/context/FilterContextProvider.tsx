import { createContext, useContext, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useProdductData } from "../hook/useProdductData";
import type { Product } from "../types/interfaces";

interface FilterContextProviderProps {
  children: ReactNode;
}

interface ProductFilter {
  range: number;
  rating: number;
  discount: number;
  sorting: string;
}

interface Tags {
  rating?: string;
  discount?: string;
  sorting?: string;
}

interface FilterContextType {
  filteredProductData: Product[] | null;
  setProduct: (updates: Partial<ProductFilter>) => void;
  product: ProductFilter;
  maxPrice: number;
  minPrice: number;
  tags: Tags;
  setTags: (updates: Partial<Tags>) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterContextProvider = ({ children }: FilterContextProviderProps) => {
  const [tags, setTags] = useState<Tags>({
    rating: "",
    discount: "",
    sorting: "",
  });
  const { category } = useParams();
  const url = `https://dummyjson.com/products/category/${category}`;
  const { productData } = useProdductData(url);

  const filteredProductData =
    productData?.filter((data: Product) => data?.category === category) ?? [];

  const minPrice = filteredProductData?.reduce(
    (curr: Product, acc: Product) => (curr.price < acc.price ? curr : acc),
    filteredProductData[0]
  )?.price;

  const maxPrice = filteredProductData?.reduce(
    (curr: Product, acc: Product) => (curr.price > acc.price ? curr : acc),
    filteredProductData[0]
  )?.price;

  const [product, setProduct] = useState<ProductFilter>({
    range: maxPrice,
    rating: 0,
    discount: 0,
    sorting: "popularty",
  });

  const rangeFilter =
    product.range > 0
      ? filteredProductData.filter(
          (data: Product) => data.price <= product.range
        )
      : filteredProductData;

  const radioFilter =
    product.rating > 0
      ? rangeFilter.filter((data: Product) => data.rating >= product.rating)
      : rangeFilter;

  const discountFilter =
    product.discount > 0
      ? radioFilter.filter(
          (data: Product) => data.discountPercentage >= product.discount
        )
      : radioFilter;

  const sortedData = [...discountFilter].sort((a: Product, b: Product) => {
    switch (product.sorting) {
      case "az":
        return a.title.localeCompare(b.title);

      case "za":
        return b.title.localeCompare(a.title);

      case "lth":
        return a.price - b.price;

      case "htl":
        return b.price - a.price;

      case "popularity":
      default:
        return 0;
    }
  });

  const updateProduct = (updates: Partial<ProductFilter>) => {
    setProduct((prev) => ({ ...prev, ...updates }));
  };

  const updateTags = (updates: Partial<Tags>) => {
    setTags((prev) => ({ ...prev, ...updates }));
  };

  console.log("tags", tags);

  return (
    <FilterContext.Provider
      value={{
        filteredProductData: sortedData,
        setProduct: updateProduct,
        product,
        maxPrice,
        minPrice,
        tags,
        setTags: updateTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterContextProvider");
  }
  return context;
};
