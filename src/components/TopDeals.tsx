import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryListingCard } from "../utils/HOCcards";
import type { CategoryItemInterface, Product } from "../types/interfaces";

const TopDeals = () => {
  const [productData, setProductData] = useState([]);
  const URL = "https://dummyjson.com/products";

  const getData = async () => {
    const res = await fetch(URL);
    const products = await res.json();
    setProductData(products.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const categoryList = productData?.reduce(
    (acc: CategoryItemInterface[], curr: Product) => {
      if (
        !acc.find(
          (item: CategoryItemInterface) => item.category === curr.category
        )
      ) {
        acc.push(curr);
      }
      return acc;
    },
    [] as CategoryItemInterface[]
  );

  return (
    <div>
      <ol className=" flex gap-5 flex-wrap">
        {categoryList.map(
          ({ title, images, category, price, id }: CategoryItemInterface) => (
            <Link key={id} to={`products/${category}`}>
              <CategoryListingCard
                title={title}
                images={images}
                category={category}
                price={price}
              />
            </Link>
          )
        )}
      </ol>
    </div>
  );
};

export default TopDeals;
