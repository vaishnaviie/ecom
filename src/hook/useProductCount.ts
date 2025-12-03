import { useState } from "react";

const useProductCount = () => {
  const [productCount, setProductCount] = useState(0);

  return { productCount, setProductCount, handleIncrease, handleDecrease };
};

export default useProductCount;
