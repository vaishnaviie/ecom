import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../types/interfaces";
import { calculateMRP, URL } from "../../utils/utils";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  type CartItem,
} from "../../feature/cart/cartSlice";
import Layout from "../layout/Layout";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.myCart.cart);

  console.log("cart", cart);

  const total = cart.reduce((acc: number, curr: CartItem) => {
    console.log(curr.price);
    console.log(curr.quantity);
    console.log(acc);
    return curr.price * curr.quantity + acc;
  }, 0);

  console.log("total", total);

  return (
    <Layout url={URL}>
      <div className="text-color min-h-screen grid grid-cols-3 gap-6 border mx-34">
        <div className="col-span-2 flex flex-col gap-4 ">
          {cart?.map((product: Product) => (
            <div className="flex items-center justify-center gap-16 p-4 border border-gray-300 rounded">
              <div className=" flex flex-col border pb-2">
                <img
                  src={product?.thumbnail}
                  alt="thumbnail image"
                  height="200px"
                  width="200px"
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(decreaseProductQuantity(product.id))
                    }
                    disabled={product.quantity === 0}
                    className={`border p-2 rounded ${
                      product.quantity === 0
                        ? "cursor-not-allowed btn-disabled "
                        : "cursor-pointer"
                    } `}
                  >
                    -
                  </button>
                  <div className="border p-2 px-6 rounded">
                    {product.quantity}
                  </div>
                  <button
                    disabled={product.quantity === product.stock}
                    onClick={() =>
                      dispatch(increaseProductQuantity(product.id))
                    }
                    className={`border p-2 rounded ${
                      product.quantity === product.stock
                        ? "cursor-not-allowed btn-disabled "
                        : "cursor-pointer"
                    } `}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className=" font-bold text-gray-400">{product?.brand}</div>
                <div className=" font-bold">{product?.title}</div>
                <div className="flex gap-2 items-center p-1 text-xl">
                  <span className="font-bold text-color">
                    ${product?.price}
                  </span>
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

        <div className="col-span-1">
          <p className=" text-2xl font-semibold text-center my-2 underline">
            Price
          </p>
          {cart.map((item: CartItem) => (
            <div>
              <div className="flex justify-between px-4 mb-1">
                <div>{item.title}</div>
                <div>
                  $ {item.price} X {item.quantity}
                </div>
              </div>
              {/* <div className=" text-right mr-4">
                = {item.price * item.quantity}
              </div> */}
            </div>
          ))}
          <hr />
          <div className="flex justify-between px-4 mt-1 font-bold">
            <div>TOTAL</div>

            <div>$ {total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
