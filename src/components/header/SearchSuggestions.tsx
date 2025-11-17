import { useNavigate } from "react-router-dom";
import type {
  FilteredItemInterface,
  SearchSuggestionsINterface,
} from "../../types/interfaces";

const SearchSuggestions = ({
  showSuggestions,
  searchInput,
  filteredProducts,
}: SearchSuggestionsINterface) => {
  const navigate = useNavigate();
  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="suggestion-text-theme font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const clickHandler = (product: FilteredItemInterface) => {
    if (product.tag === "category") {
      navigate(`/products/${product.category}`);
    } else if (product.tag === "brand") {
      navigate(`/products/${product.brand}`);
    } else {
      navigate(`/products/${product.category}/${product.title}`);
    }
  };

  return (
    <>
      {showSuggestions &&
        searchInput.length > 0 &&
        filteredProducts?.length > 0 && (
          <div className=" absolute top-full left-[-1px] w-full  bg-white rounded border shadow-[6px_7px_3px_-3px_rgba(0,0,0,0.1)] z-10">
            {filteredProducts?.map(
              (product: FilteredItemInterface, i: number) => (
                <div
                  key={i}
                  className=" border-b pl-2 min-h-10 flex flex-col justify-center "
                  onClick={() => clickHandler(product)}
                >
                  {product?.productName && (
                    <div className=" text-gray-400">
                      {highlightText(product?.productName, searchInput)}
                    </div>
                  )}{" "}
                  {product?.categoryName && (
                    <div className=" text-gray-400">
                      {highlightText(
                        product.categoryName.charAt(0).toUpperCase() +
                          product.categoryName.slice(1),
                        searchInput
                      )}
                    </div>
                  )}
                  {product?.brandName && (
                    <div className=" text-gray-400">
                      {highlightText(product.brandName, searchInput)}
                    </div>
                  )}{" "}
                  {product?.tag && (
                    <div className="text-xs font-bold">{product.tag}</div>
                  )}
                </div>
              )
            )}
          </div>
        )}
    </>
  );
};

export default SearchSuggestions;
