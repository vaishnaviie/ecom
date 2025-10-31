import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

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

  const categoryList = productData.reduce((acc: any, curr: any) => {
    if (!acc.find((item: any) => item.category === curr.category)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  console.log(categoryList);

  return (
    <div>
      <ol className=" flex gap-5 flex-wrap">
        {categoryList.map(({ title, images, category, price, id }) => (
          <Link key={id} to={`products/${category}`}>
            <ProductCard
              title={title}
              images={images}
              category={category}
              price={price}
            />
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default TopDeals;
