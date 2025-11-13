import { InputSvg } from "../../svgs/Svg";
import type { SearchInterface } from "../../types/interfaces";
import SearchSuggestions from "./SearchSuggestions";

const Search = ({
  onInputChange,
  showSuggestions,
  searchInput,
  filteredProducts,
}: SearchInterface) => {
  return (
    <div className="bg-white flex items-center rounded gap-2 px-2 grow relative">
      <InputSvg />
      <input
        className="grow outline-none h-8 md:h-10 md:text-xl rounded bg-white"
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => onInputChange(e.target.value)}
      />

      <SearchSuggestions
        showSuggestions={showSuggestions}
        searchInput={searchInput}
        filteredProducts={filteredProducts}
      />
    </div>
  );
};

export default Search;
