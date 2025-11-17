import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../types/interfaces";
import { useProdductData } from "../../hook/useProdductData";
import { ProductListingCard } from "../../hoc/HOCcards";
import SideBar from "./SideBar";
import Layout from "../layout/Layout";
import { useFilter } from "../../context/FilterContextProvider";
import { sorting } from "../../const/const";

const ProductListing = () => {
  const { category } = useParams();
  const { product, setProduct } = useFilter();
  const navigate = useNavigate();

  const url = `https://dummyjson.com/products/category/${category}`;

  // const { productData } = useProdductData(url);

  // const { productData, isLoading, error, refetch } = useProdductData(url);
  const { isLoading, error, refetch } = useProdductData(url);
  const { filteredProductData } = useFilter();

  // const filteredProductData = productData?.filter(
  //   (data: Product) => data?.category === category
  // );

  // const filteredProductData =
  //   productData?.filter((data: Product) => data?.category === category) ?? [];

  // console.log("filteredProductData", filteredProductData);

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

  // if (filteredProductData?.length === 0) {
  //   return <div>No products found in this category.</div>;
  // }

  const clickHandler = (title: string, category: string) => {
    navigate(`/products/${category}/${title}`);
  };

  return (
    <Layout url={url}>
      <div className="flex ">
        <SideBar />
        <div>
          <select
            value={product.sorting}
            onChange={(e) => setProduct({ sorting: e.target.value })}
          >
            {sorting.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>

          <ol className="grid grid-cols-1 sm: mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5 mt-5 mx-2 ">
            {filteredProductData?.length === 0
              ? `No products found in ${category} category`
              : filteredProductData?.map(
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
