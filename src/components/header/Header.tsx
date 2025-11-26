import { logoUrl } from "../../utils/utils";
import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import { CartSvg, HamburgerSvg, LoginSvg } from "../../svgs/Svg";
import { useSearch } from "../../hook/useSearch";
import { themes } from "../../const/const";
// import { useTheme } from "../../hook/useTheme";
import MobViewHeader from "./MobViewHeader";
import { useProdductData } from "../../hook/useProdductData";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContextProvider";

export interface HeaderProps {
  url: string;
}

const Header = ({ url }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { productData } = useProdductData(url);
  const { inputChangeHandler, showSuggestions, searchInput, filteredProducts } =
    useSearch(productData);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-header-theme flex flex-wrap gap-3 lg:gap-8 justify-between items-center p-2 mb-2 lg:px-32 relative">
      <div className=" cursor-pointer" onClick={() => navigate("/")}>
        <Logo logoUrl={logoUrl} />
      </div>
      <Search
        onInputChange={inputChangeHandler}
        showSuggestions={showSuggestions}
        searchInput={searchInput}
        filteredProducts={filteredProducts}
      />

      <div className="flex items-center md:gap-2 md:px-4">
        <CartSvg />
        <span className="hidden md:block text-color">Cart</span>
      </div>

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className=" md:hidden"
      >
        <HamburgerSvg />
      </button>

      <div className="hidden md:flex items-center gap-2 px-4">
        <LoginSvg />
        <span className="text-color">Login</span>
      </div>

      <div className="hidden md:block">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className=" rounded-md bg-white p-2 outline-none focus:ring focus:ring-amber-600 cursor-pointer"
        >
          {themes?.map(({ label, value }) => (
            <option className="cursor-pointer" value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <MobViewHeader isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </div>
  );
};

export default Header;
