import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Rounter, Routes, Route } from "react-router-dom";
import ProductListing from "./components/ProductListing.tsx";

function App() {
  return (
    <div className="className=box-border">
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
