import { useMemo, useState } from "react";
import type { FilteredItemInterface, Product } from "../types/interfaces";
import { useProdductData } from "./useProdductData";
import { URL } from "../utils/utils";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { productData } = useProdductData(URL);

  const filteredProducts = useMemo(() => {
    const brands = new Set();
    const categories = new Set();
    const results: FilteredItemInterface[] = [];

    if (!productData || searchInput.length === 0) return [];

    productData.forEach((product: Product) => {
      const searchTerm = searchInput.toLowerCase();

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
  }, [productData, searchInput]);

  const inputChangeHandler = (value: string) => {
    setSearchInput(value);
    setShowSuggestions(value?.length > 0);
  };

  console.log("filteredProducts", filteredProducts);

  return {
    searchInput,
    inputChangeHandler,
    filteredProducts,
    showSuggestions,
  };
};
