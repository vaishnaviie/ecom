import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductListing = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const URL = "https://dummyjson.com/products";
  const getData = async () => {
    const result = await fetch(URL);
    const products = await result.json();

    const filteredData = products?.products?.filter(
      (data: any) => data?.category === category
    );

    setCategoryData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ol className=" flex gap-5 flex-wrap">
        {categoryData?.map(({ title, images, category, price, id }) => (
          <li key={id}>
            <ProductCard
              title={title}
              images={images}
              category={category}
              price={price}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProductListing;
