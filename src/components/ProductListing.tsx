import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductListingCard } from "../utils/HOCcards";
import type { Product } from "../types/interfaces";

const ProductListing = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const URL = "https://dummyjson.com/products";
  const getData = async () => {
    const result = await fetch(URL);
    const products = await result.json();

    const filteredData = products?.products?.filter(
      (data: Product) => data?.category === category
    );

    setCategoryData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ol className=" flex gap-5 flex-wrap m-2 my-5">
        {categoryData?.map(
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
    </div>
  );
};

export default ProductListing;
