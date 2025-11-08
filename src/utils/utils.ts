export const URL = "https://dummyjson.com/products?limit=194";

export const logoUrl =
  "https://i.pinimg.com/1200x/4d/02/6e/4d026ea519059084425e8da800647c63.jpg";

export const calculateMRP = (currentPrice: number, discount: number) => {
  console.log(currentPrice, discount);
  return currentPrice / (1 - discount / 100);
};

export const getRatingColor = (num: number) => {
  if (num === 0) {
    return;
  } else if (num >= 4) {
    return "bg-green-700";
  } else if (num >= 2) {
    return "bg-yellow-600";
  } else {
    return "bg-red-600";
  }
};
