import { logoUrl } from "../../utils/utils";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import { CartSvg, LoginSvg } from "../../svgs/Svg";
import { useSearch } from "../../hook/useSearch";

const Header = () => {
  const [theme, setTheme] = useState("default");
  const { inputChangeHandler, showSuggestions, searchInput, filteredProducts } =
    useSearch();

  const themes = [
    { label: "Default", value: "default" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  const getActualTheme = () => {
    if (theme === "default") {
      const currentHour = new Date().getHours();

      if (currentHour >= 19 || currentHour <= 4) {
        return "dark";
      } else {
        return "light";
      }
    }
    return theme;
  };

  useEffect(() => {
    const actualTheme = getActualTheme();
    // Remove all theme classes
    document.documentElement.classList.remove("light", "dark");

    // Add the current theme class
    document.documentElement.classList.add(actualTheme);
    localStorage.setItem("theme", actualTheme);
    // setTheme(actualTheme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem(theme);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  console.log("theme", theme);

  return (
    <div>
      {/* bg-[#dae660] */}

      <div className="bg-header-theme flex gap-8 justify-between items-center p-2 mb-2 px-32 ">
        <Logo logoUrl={logoUrl} />

        <Search
          onInputChange={inputChangeHandler}
          showSuggestions={showSuggestions}
          searchInput={searchInput}
          filteredProducts={filteredProducts}
        />

        <div className="flex items-center gap-2 px-4">
          <CartSvg />
          <span className="text-color">Cart</span>
        </div>

        <div className="flex items-center gap-2 px-4">
          <LoginSvg />

          <span className="text-color">Login</span>
        </div>

        <div className="  ">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className=" rounded-md bg-white p-2 outline-none focus:ring focus:ring-amber-600 cursor-pointer"
          >
            {themes.map(({ label, value }) => (
              <option className="cursor-pointer" value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div className="border-2 border-red-500 bg-primary-myGreen ">Test</div> */}
    </div>
  );
};

export default Header;
