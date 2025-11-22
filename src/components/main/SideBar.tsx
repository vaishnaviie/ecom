import { useFilter } from "../../context/FilterContextProvider";

const SideBar = () => {
  const { product, setProduct, maxPrice, minPrice } = useFilter();

  return (
    <div className="w-[25%] border border-red-600 p-4">
      <div className="flex justify-between">
        <h2 className=" font-bold text-2xl">Filters</h2>
        <button
          className="border border-blue-700 px-2 font-semibold rounded"
          onClick={() =>
            setProduct({
              range: 500,
              rating: 0,
              discount: 0,
            })
          }
        >
          clear
        </button>
      </div>

      <div className=" ">
        Range
        <label className="block ">
          <input
            className=" cursor-pointer "
            type="range"
            min={minPrice}
            max={maxPrice}
            value={product.range}
            onChange={(e) => setProduct({ range: Number(e.target.value) })}
            // onChange={(e) =>setProduct((prev:any) => ({ ...prev, range: Number(e.target.value) }));}
          />
        </label>
        <div className="flex justify-between w-[40%] ">
          <div className="outline-gray-500 w-10 text-xs">${minPrice}</div>
          <div className="outline-gray-500 w-10 text-xs">${maxPrice}</div>
          {/* <input
            type="number"
            value={minPrice}
            className="  outline-gray-500 w-10 text-xs"
          /> */}
          {/* <input
            type="number"
            value={maxPrice}
            className=" outline-gray-500 w-10 text-xs"
          /> */}
        </div>
      </div>

      <div>
        Ratings
        {[4, 3, 2, 1].map((rating: number) => (
          <div key={rating}>
            <label className=" cursor-pointer">
              <input
                type="radio"
                name="radio"
                checked={product?.rating === rating}
                onChange={() => setProduct({ rating: Number(rating) })}
              />
              {rating}✭ and above
            </label>
          </div>
        ))}
      </div>

      <div>
        Discounts
        {[20, 15, 10, 5].map((discount) => (
          <div>
            <label className=" cursor-pointer">
              <input
                type="radio"
                name="discount"
                checked={product.discount === discount}
                onChange={() => setProduct({ discount: Number(discount) })}
              />
              {discount}% and above
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
