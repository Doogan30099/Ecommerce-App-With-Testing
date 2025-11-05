import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./pages/CartPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetailspage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import { Checkout } from "./pages/CheckoutPage";



function App() {
  

  return (
   <>
   
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
      <Footer />
   </>
  );
}

export default App;
