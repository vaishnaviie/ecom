import { useCart } from "../../context/CartContextProvider";
import type { Product } from "../../types/interfaces";
import { calculateMRP } from "../../utils/utils";

const Cart = () => {
  const {
    cart,
    productCount,
    setProductCount,
    handleDecrease,
    handleIncrease,
  } = useCart();
  // const { handleDecrease, handleIncrease } = useProductCount();
  // console.log("mycart", cart);

  return (
    <div className="text-color min-h-screen grid grid-cols-3 gap-6 border mx-34">
      <div className="col-span-2 flex flex-col gap-4 ">
        {cart?.map((product: Product) => (
          <div className="flex items-center justify-center gap-16 p-4 border border-gray-300 rounded">
            <div className=" flex flex-col border">
              <img
                src={product?.thumbnail}
                alt="thumbnail image"
                height="200px"
                width="200px"
              />
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleDecrease(product.id)}
                  disabled={productCount === 0}
                  className={`border p-2 rounded ${
                    productCount === 0
                      ? "cursor-not-allowed btn-disabled "
                      : "cursor-pointer"
                  } `}
                >
                  -
                </button>
                <div className="border p-2 px-6 rounded">{productCount}</div>
                <button
                  disabled={productCount === product.stock}
                  onClick={() => handleIncrease(product.id)}
                  className={`border p-2 rounded ${
                    productCount === product.stock
                      ? "cursor-not-allowed btn-disabled "
                      : "cursor-pointer"
                  } `}
                >
                  +
                </button>
              </div>
              <div>{product?.stock}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className=" font-bold text-gray-400">{product?.brand}</div>
              <div className=" font-bold">{product?.title}</div>
              <div className="flex gap-2 items-center p-1 text-xl">
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

              {/* <div>weight : {product?.weight} </div> */}
              <div className="flex gap-8">
                <div className=" text-xs text-green-500">
                  {product?.returnPolicy}
                </div>
                <div className=" text-xs text-green-500">
                  {product?.warrantyInformation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-1">price</div>
    </div>
  );
};

export default Cart;
