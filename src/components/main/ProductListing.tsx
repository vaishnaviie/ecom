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
          <div className="flex items-center gap-2 mx-10">
            <select
              className="text-color bg-card-theme p-2 rounded"
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
                <option className="text-color bg-card-theme" value={value}>
                  {label}
                </option>
              ))}
            </select>

            <div className="flex gap-2 text-color  ">
              {Object.entries(tags)
                .filter(([key, value]) => value)
                .map(([key, value]) => (
                  <div className="flex gap-5 justify-between px-2 min-w-16 py-1 bg-card-theme border border-gray-300 rounded">
                    <div key={key} className="  ">
                      {value}
                    </div>
                    <button
                      onClick={() => {
                        setTags({ [key]: "" });
                        setProduct({ [key]: "" });
                      }}
                      className=" px-1 border border-red-500 cursor-pointer text-red-500 bg-white font-bold rounded "
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <ol className="grid grid-cols-1 sm: mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5 mt-5  ">
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
