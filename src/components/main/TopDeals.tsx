import { Link } from "react-router-dom";
import { useProdductData } from "../../hook/useProdductData";
import type { CategoryItemInterface, Product } from "../../types/interfaces";
import { CategoryListingCard } from "../../hoc/HOCcards";
import { URL } from "../../utils/utils";

const TopDeals = () => {
  const { productData, isLoading, error, refetch } = useProdductData(URL);

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

  if (isLoading) {
    return <div className="text-color">Loading products...</div>;
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

  return (
    <div>
      <ol className=" grid grid-cols-1 sm: mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 mx-2 ">
        {categoryList?.map(
          ({ title, images, category, price, id }: CategoryItemInterface) => (
            <Link key={id} to={`products/${category}`} className="w-full ">
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
