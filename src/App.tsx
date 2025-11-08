import "./App.css";
import ProductListing from "./components/main/ProductListing";
import Home from "./pages/Home";
import { BrowserRouter as Rounter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="className=box-border background-theme ">
      <Rounter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductListing />} />
        </Routes>
      </Rounter>
    </div>
  );
}

export default App;
