import { useParams } from "react-router-dom";
import type { Product } from "../../types/interfaces";
import { useProdductData } from "../../hook/useProdductData";
import { URL } from "../../utils/utils";
import { ProductListingCard } from "../../hoc/HOCcards";

const ProductListing = () => {
  const { category } = useParams();

  const { productData, isLoading, error, refetch } = useProdductData(URL);

  const filteredProductData = productData?.filter(
    (data: Product) => data?.category === category
  );

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button
          className=" border border-green-700 px-2 rounded bg-green-600 text-white m-2 hover:bg-green-400 cursor-pointer"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  if (filteredProductData?.length === 0) {
    return <div>No products found in this category.</div>;
  }

  return (
    <ol className="flex justify-between gap-5 flex-wrap pt-5 mx-2">
      {filteredProductData?.map(
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
        }) => (
          <li key={id}>
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
  );
};

export default ProductListing;
