const SideBar = () => {
  return (
    <div className="w-[25%] border border-red-600 p-4">
      <div className="flex justify-between">
        <h2 className=" font-bold text-2xl">Filters</h2>
        <button className="border border-blue-700 px-2 font-semibold rounded">
          clear
        </button>
      </div>

      <div>
        Range
        <label className="block">
          <input className=" cursor-pointer" type="range" />
        </label>
      </div>

      <div>
        Ratings
        {[1, 2, 3, 4].map((rating: number) => (
          <div key={rating}>
            <label className=" cursor-pointer">
              <input type="radio" name="radio" />
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
              <input type="checkbox" />
              {discount}% and above
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
