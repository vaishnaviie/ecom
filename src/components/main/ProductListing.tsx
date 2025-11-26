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

  const { isLoading, error, refetch } = useProdductData(url);
  const { filteredProductData, setTags, tags } = useFilter();

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

  const clickHandler = (title: string, category: string) => {
    navigate(`/products/${category}/${title}`);
  };

  console.log(tags);

  return (
    <Layout url={url}>
      <div className="flex ">
        <SideBar />
        <div>
          <select
            value={product.sorting}
            onChange={(e) => {
              setProduct({ sorting: e.target.value });
              const sortedValue = sorting.find(
                (data: any) => data.value === e.target.value
              );
              setTags({ sorting: String(sortedValue?.label) });
            }}
          >
            {sorting.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>

          {/* <div className="flex gap-2">
            <div className=" px-2 border border-green-800 min-w-16 py-1 flex justify-between gap-2">
              {tags?.rating}
              <button className="border border-red-700 px-1 ">x</button>
            </div>

            <div className=" px-2 border border-green-800 min-w-16 py-1 flex justify-between gap-2">
              {tags?.discount}
              <button className="border border-red-700 px-1 ">x</button>
            </div>

            {tags.sorting && (
              <div className=" px-2 border border-green-800 min-w-16 py-1 flex justify-between gap-2">
                {tags?.sorting}
                <button
                  onClick={() => setTags({ sorting: "" })}
                  className="border border-red-700 px-1 "
                >
                  x
                </button>
              </div>
            )}
          </div> */}
          <div className="flex gap-2">
            {Object.entries(tags)
              .filter(([key, value]) => value)
              .map(([key, value]) => (
                <div
                  key={key}
                  className=" px-2 border border-green-800 min-w-16 py-1 flex justify-between gap-2"
                >
                  {value}
                  <button
                    onClick={() => {
                      setTags({ [key]: "" });
                      setProduct({ [key]: "" });
                    }}
                    className="border border-red-700 px-1  cursor-pointer "
                  >
                    x
                  </button>
                </div>
              ))}
          </div>

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
