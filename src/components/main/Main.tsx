import { useNavigate } from "react-router-dom";
import TopDeals from "./TopDeals";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/all_products")}
        className="text-color cursor-pointer"
      >
        View all products
      </button>
      <TopDeals />
    </div>
  );
};

export default Main;
