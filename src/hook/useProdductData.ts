import { useEffect, useState } from "react";

export const useProdductData = (url: string) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await fetch(url);
      if (!result.ok) throw new Error("Failed to fetch data");
      const products = await result.json();

      setProductData(products.products);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

  return { productData, isLoading, error, refetch: getData };
};
