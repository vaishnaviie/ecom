import { logoUrl } from "../../utils/utils";
import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import { CartSvg, CrossSvg, HamburgerSvg, LoginSvg } from "../../svgs/Svg";
import { useSearch } from "../../hook/useSearch";
import { themes } from "../../const/const";
import { useTheme } from "../../hook/useTheme";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { inputChangeHandler, showSuggestions, searchInput, filteredProducts } =
    useSearch();
  const { theme, setTheme } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-header-theme flex flex-wrap gap-3 lg:gap-8 justify-between items-center p-2 mb-2 lg:px-32 relative">
      <Logo logoUrl={logoUrl} />
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
      {/* mob */}

      <div
        className={`fixed inset-0 z-40 duration-300 md:hidden ${
          isMobileMenuOpen ? " pointer-events-auto" : " pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`md:hidden fixed top-0 right-0 w-[70%] h-full bg-header-theme shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="flex flex-col p-4 space-y-4">
          <div
            className="flex flex-row-reverse"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CrossSvg />
          </div>

          <div className="flex items-center gap-2 px-4 py-2">
            <LoginSvg />
            <span className="text-color">Login</span>
          </div>

          <div className="px-4 py-2">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-md bg-white p-2 outline-none focus:ring focus:ring-amber-600 cursor-pointer"
            >
              {themes?.map(({ label, value }) => (
                <option key={value} className="cursor-pointer" value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="absolute bottom-0 p-2">
            © {currentYear} Company. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
