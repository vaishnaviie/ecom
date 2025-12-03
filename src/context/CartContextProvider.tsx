import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Product } from "../types/interfaces";

interface CartContextProviderProps {
  children: ReactNode;
}

interface CartContextType {
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
  handleAddToCart: (product: Product) => void;
  // handleGoToCart: () => void;
  isProductInCart: boolean;
  setIsProductInCart: Dispatch<SetStateAction<boolean>>;
  productCount: number;
  setProductCount: Dispatch<SetStateAction<number>>;
  handleIncrease: (productId: number) => void;
  handleDecrease: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [productCount, setProductCount] = useState(0);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  console.log("first", cart);

  const handleIncrease = (productId: number) => {
    setProductCount((prev) => prev + 1);

    setCart((prev) =>
      prev.map((item: Product) =>
        item.id === productId ? { ...item, productCount } : item
      )
    );
  };

  const handleDecrease = (productId: number) => {
    setProductCount((prev) => prev - 1);

    setCart((prev) => prev.filter((item: Product) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        isProductInCart,
        setIsProductInCart,
        productCount,
        setProductCount,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterContextProvider");
  }
  return context;
};
