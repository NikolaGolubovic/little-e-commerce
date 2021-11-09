import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StoreContext as Store } from "./contexts/storeContext";
import "./App.css";
import Navigation from "./components/Nav";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

function App() {
  const StoreContext = useContext(Store);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    console.log(StoreContext.test);
  }, []);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="products/*" element={<Products />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart/*" element={<Cart />} />
      </Routes>
      <Modal />
    </Router>
  );
}

export default App;
