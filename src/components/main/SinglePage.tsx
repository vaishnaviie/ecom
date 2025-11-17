import { useParams } from "react-router-dom";
import { useProdductData } from "../../hook/useProdductData";
import type { Product } from "../../types/interfaces";

const SinglePage = () => {
  const { title } = useParams();

  const { productData } = useProdductData(
    `https://dummyjson.com/products/search?q=${title}`
  );
  return (
    <div>
      {/* {productData.map((data: Product) => (
        <div>{data?.title}</div>
      ))} */}
      {(productData as Product[])[0]?.title}
    </div>
  );
};

export default SinglePage;
