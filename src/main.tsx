import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeContextProvider from "./context/ThemeContextProvider.tsx";
import CartContextProvider from "./context/CartContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
