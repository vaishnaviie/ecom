import type { ProductCardInterface } from "../../types/interfaces";
import { calculateMRP } from "../../utils/utils";

const ProductCard = ({
  title,
  images,
  category,
  price,
  isRating,
  rating,
  isDiscountPercentage,
  discountPercentage,
  isPrice,
  isTitle,
  isCategory,
}: ProductCardInterface) => {
  return (
    <div className="bg-card-theme border border-gray-300 cursor-pointer rounded flex flex-col  items-center gap-1 p-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-400">
      <img src={images[0]} alt="image" height="400px" width="300px" />

      {isCategory && (
        <div>
          <p className=" text-center text-color">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
          <p className=" text-center font-bold text-color">
            Starting from ${price}
          </p>
        </div>
      )}

      {isTitle && <p className="text-color truncate max-w-3xs">{title}</p>}

      {isRating && (
        <div className=" bg-green-700 text-white px-2 py-1 rounded text-xs font-bold w-fit">
          {rating} ✭{" "}
        </div>
      )}

      <div className="flex gap-2 items-center">
        {isPrice && <span className="font-bold text-color">${price}</span>}
        {isDiscountPercentage && (
          <span className=" text-gray-500 text-sm line-through">
            ${calculateMRP(price, discountPercentage || 0)?.toFixed(2)}
          </span>
        )}
        {discountPercentage && (
          <span className=" text-xs font-bold text-green-500">
            {discountPercentage}% off
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
