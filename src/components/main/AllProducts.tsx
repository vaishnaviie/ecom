import { useNavigate } from "react-router-dom";
import { ProductListingCard } from "../../hoc/HOCcards";
import { useProdductData } from "../../hook/useProdductData";
import type { Product } from "../../types/interfaces";
import { URL } from "../../utils/utils";

const AllProducts = () => {
  const navigate = useNavigate();
  const { productData, isLoading, error, refetch } = useProdductData(URL);

  const clickHandler = (title: string, category: string) => {
    navigate(`/products/${category}/${title}`);
  };
  return (
    // <div>
    <ol className="grid grid-cols-1 sm: mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5  ">
      {productData?.length === 0
        ? `No products found `
        : productData?.map(
            ({
              title,
              images,
              category,
              price,
              id,
              brand,
              rating,
              thumbnail,
              discountPercentage,
            }: Product) => (
              <li key={id} onClick={() => clickHandler(title, category)}>
                <ProductListingCard
                  title={title}
                  images={images}
                  category={category}
                  price={price}
                  brand={brand}
                  rating={rating}
                  thumbnail={thumbnail}
                  discountPercentage={discountPercentage}
                />
              </li>
            )
          )}
    </ol>
    // </div>
  );
};

export default AllProducts;
