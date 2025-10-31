import type { ComponentType } from "react";
import ProductCard from "../components/ProductCard";
import type { ProductCardInterface } from "../types/interfaces";

const withCategoryListingVariant = (
  Component: ComponentType<ProductCardInterface>
) => {
  return (props: ProductCardInterface) => (
    <Component
      {...props}
      isRating={false}
      isDiscountPercentage={false}
      isBrand={false}
      isPrice={false}
      isTitle={false}
      isCategory={true}
    />
  );
};

const withProductListingVariant = (
  Component: ComponentType<ProductCardInterface>
) => {
  return (props: ProductCardInterface) => (
    <Component
      {...props}
      isRating={true}
      isDiscountPercentage={true}
      isBrand={true}
      isPrice={true}
      isTitle={true}
      isCategory={false}
    />
  );
};

export const CategoryListingCard = withCategoryListingVariant(ProductCard);
export const ProductListingCard = withProductListingVariant(ProductCard);
