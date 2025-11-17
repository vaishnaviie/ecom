import "./App.css";
import ProductListing from "./components/main/ProductListing";
import SinglePage from "./components/main/SinglePage";
import FilterContextProvider from "./context/FilterContextProvider";
import Home from "./pages/Home";
import { BrowserRouter as Rounter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="className=box-border background-theme ">
      <Rounter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products/:category"
            element={
              <FilterContextProvider>
                <ProductListing />
              </FilterContextProvider>
            }
          />
          <Route path="/products/:category/:title" element={<SinglePage />} />
        </Routes>
      </Rounter>
    </div>
  );
}

export default App;
