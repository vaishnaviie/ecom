import { useMemo, useState } from "react";
import type { FilteredItemInterface, Product } from "../types/interfaces";
import { useProdductData } from "./useProdductData";
import { URL } from "../utils/utils";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { productData } = useProdductData(URL);

  const filteredProducts = useMemo(() => {
    if (!productData || searchInput.length === 0) return [];

    return productData.reduce((acc: FilteredItemInterface[], curr: Product) => {
      const searchTerm = searchInput.toLowerCase();

      if (curr?.title?.toLowerCase()?.includes(searchTerm)) {
        return [...acc, { ...curr, productName: curr?.title }];
      }

      if (curr?.category?.toLowerCase()?.includes(searchTerm)) {
        const categoryExists = acc.some(
          (prod) => prod?.categoryName === curr?.category
        );
        if (!categoryExists) {
          return [
            ...acc,
            { ...curr, categoryName: curr?.category, tag: "category" },
          ];
        }
      }

      if (curr?.brand?.toLowerCase()?.includes(searchTerm)) {
        const brandExists = acc.some((prod) => prod?.brandName === curr?.brand);
        if (!brandExists) {
          return [...acc, { ...curr, brandName: curr?.brand, tag: "brand" }];
        }
      }

      return acc;
    }, []);
  }, [productData, searchInput]);

  const inputChangeHandler = (value: string) => {
    setSearchInput(value);
    setShowSuggestions(value?.length > 0);
  };

  // const hideSuggestions = () => {
  //   setShowSuggestions(false);
  // };

  // const clearSearch = () => {
  //   setSearchInput("");
  //   setShowSuggestions(false);
  // };

  return {
    searchInput,
    inputChangeHandler,
    // hideSuggestions,
    // clearSearch,
    filteredProducts,
    showSuggestions,
  };
};
