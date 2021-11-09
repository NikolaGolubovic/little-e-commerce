import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StoreContext } from "./contexts/storeContext";
import "./App.css";
import Navigation from "./components/Nav";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

function App() {
  const storeContext = useContext(StoreContext);
  const { openModal, itemName } = storeContext;
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="products/*" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart/*" element={<Cart />} />
        </Routes>
        <Modal openModal={openModal} itemName={itemName} />
      </Router>
    </>
  );
}

export default App;
