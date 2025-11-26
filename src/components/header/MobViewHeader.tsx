import { themes, currentYear } from "../../const/const";
import { useTheme } from "../../context/ThemeContextProvider";
// import { useTheme } from "../../hook/useTheme";
import { CrossSvg, LoginSvg } from "../../svgs/Svg";
import type { MobViewHeaderInterface } from "../../types/interfaces";

const MobViewHeader = ({ isOpen, onClose }: MobViewHeaderInterface) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      {" "}
      <div
        className={`fixed inset-0 z-40 duration-300 md:hidden ${
          isOpen ? " pointer-events-auto" : " pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`md:hidden fixed top-0 right-0 w-[70%] h-full bg-header-theme shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex flex-row-reverse" onClick={onClose}>
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

export default MobViewHeader;
