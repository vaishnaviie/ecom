import { useMemo, useState } from "react";
import type { FilteredItemInterface, Product } from "../types/interfaces";
import { useDebounce } from "./useDebounce";

export const useSearch = (productData: Product[]) => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchInput = useDebounce(searchInput, 300);
  console.log("debouncedSearchInput", debouncedSearchInput);

  const filteredProducts = useMemo(() => {
    const brands = new Set();
    const categories = new Set();
    const results: FilteredItemInterface[] = [];

    if (!productData || debouncedSearchInput.length === 0) return [];

    productData.forEach((product: Product) => {
      const searchTerm = debouncedSearchInput.toLowerCase();

      if (product?.title?.toLowerCase()?.includes(searchTerm)) {
        results.push({ ...product, productName: product?.title });
      }

      if (
        product?.category?.toLowerCase()?.includes(searchTerm) &&
        !categories?.has(product?.category)
      ) {
        categories.add(product?.category);
        results.push({
          ...product,
          categoryName: product?.category,
          tag: "category",
        });
      }

      if (
        product?.brand?.toLowerCase()?.includes(searchTerm) &&
        !brands?.has(product?.brand)
      ) {
        brands.add(product.brand);
        results.push({ ...product, brandName: product?.brand, tag: "brand" });
      }
    });

    return results;
  }, [productData, debouncedSearchInput]);

  const inputChangeHandler = (value: string) => {
    setSearchInput(value);
    setShowSuggestions(value?.length > 0);
  };

  return {
    searchInput,
    inputChangeHandler,
    filteredProducts,
    showSuggestions,
  };
};
