export const URL = "https://dummyjson.com/products";

export const calculateMRP = (currentPrice: number, discount: number) => {
  console.log(currentPrice, discount);
  return currentPrice / (1 - discount / 100);
};
