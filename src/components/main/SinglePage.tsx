import { useNavigate, useParams } from "react-router-dom";
import { useProdductData } from "../../hook/useProdductData";
import ProductImage from "./ProductImage";
import { useEffect, useState } from "react";
import { calculateMRP, URL } from "../../utils/utils";
import { ProductListingCard } from "../../hoc/HOCcards";
import type { Product } from "../../types/interfaces";
import { useCart } from "../../context/CartContextProvider";
import Layout from "../layout/Layout";

const SinglePage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { cart, handleAddToCart, setIsProductInCart, isProductInCart } =
    useCart();

  const { productData, isLoading, error, refetch } = useProdductData(
    `https://dummyjson.com/products/search?q=${title}`
  );

  const product = productData?.[0];

  console.log("productData", productData);

  const [displayedProductImage, setDisplayedProductImage] = useState("");

  useEffect(() => {
    if (product?.thumbnail) {
      setDisplayedProductImage(product?.thumbnail);
    }
  }, [product]);

  useEffect(() => {
    if (cart.length > 0) {
      const productInCart = cart.some(
        (prod: Product) => prod.id === product?.id
      );
      setIsProductInCart(productInCart);
    }
  }, [cart, product]);

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button
          className=" border border-green-700 px-2 rounded bg-green-600 text-white m-2 hover:bg-green-400 cursor-pointer"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  console.log("cart", cart);

  return (
    <Layout url={URL}>
      <div className=" px-8 py-4 text-color min-h-screen ">
        <div className=" grid grid-cols-2 gap-2">
          <div>
            <div className="flex gap-4 items-center">
              <div className=" flex flex-col gap-2">
                {product?.images?.map((img: string) => (
                  <img
                    src={img}
                    alt="product image"
                    width="150px"
                    height="150px"
                    className=" cursor-pointer border border-gray-300 rounded bg-card-theme "
                    onClick={() => setDisplayedProductImage(img)}
                  />
                ))}
              </div>
              <ProductImage img={displayedProductImage} />
            </div>
            <div className="flex gap-6 justify-end my-2">
              <button
                onClick={
                  isProductInCart
                    ? handleGoToCart
                    : () => handleAddToCart(product)
                }
                className="border border-red-600 p-2 px-20 text-xl cursor-pointer rounded"
              >
                {isProductInCart ? "Go to cart" : "Add to Cart"}
              </button>
              <button className="border border-red-600 p-2 px-20 text-xl cursor-pointer rounded">
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className=" flex flex-col justify-center gap-4  ">
            <div className=" font-bold text-2xl text-gray-400">
              {product?.brand}
            </div>
            <div className=" text-2xl font-semibold">{product?.title}</div>

            <div className="flex gap-2 items-center p-1 text-2xl">
              <span className="font-bold text-color">${product?.price}</span>
              <span className=" text-gray-500 text-sm line-through">
                $
                {calculateMRP(
                  product?.price,
                  product?.discountPercentage || 0
                )?.toFixed(2)}
              </span>
              <span className=" text-xs font-bold text-green-500">
                {product?.discountPercentage}% off
              </span>
            </div>
            <div className="flex gap-2">
              <span className=" bg-green-700 text-white px-2 py-1 rounded text-xs font-bold w-fit">
                {product?.rating} ✭
              </span>
              <span className=" text-gray-500">
                {product?.reviews.length} reviews
              </span>
            </div>
            <p className=" italic">{product?.description}</p>
          </div>
        </div>
        {productData?.slice(1).length > 0 && (
          <div className=" text-2xl font-semibold p-4">Similar Products</div>
        )}
        <div
          className="flex overflow-x-auto scrollbar-hide gap-5 flex-nowrap"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {productData
            ?.slice(1)
            ?.map(
              ({
                title,
                images,
                category,
                price,
                id,
                brand,
                rating,
                thumbnail,
                discountPercentage,
              }: Product) => (
                <li
                  className=" list-none shrink-0 w-80"
                  key={id}
                  onClick={() => navigate(`/products/${category}/${title}`)}
                >
                  <ProductListingCard
                    title={title}
                    images={images}
                    category={category}
                    price={price}
                    brand={brand}
                    rating={rating}
                    thumbnail={thumbnail}
                    discountPercentage={discountPercentage}
                  />
                </li>
              )
            )}
        </div>
      </div>
    </Layout>
  );
};

export default SinglePage;
