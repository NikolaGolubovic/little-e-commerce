import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import ACTIONS from "../reducer/actions";
import { StoreContext } from "../contexts/storeContext";

const Product = () => {
  const [item, setItem] = useState({});
  const [cartInLocal, setCartInLocal] = useState([]);
  const params = useParams();
  const storeContext = useContext(StoreContext);
  const storageName = "little-shop-practice";
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setItem(res.data.filter((elem) => elem.id === +params.id)[0]);
    });
  }, [params]);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(storageName)) || [];
    setCartInLocal(storage);
  }, []);
  function toCart(item) {
    const product = { ...item, quantity: 1 };
    const storage = JSON.parse(localStorage.getItem(storageName)) || [];
    if (storage.find((elem) => elem.id === product.id)) {
      return;
    }
    storage.push(product);
    setCartInLocal(storage);
    localStorage.setItem(storageName, JSON.stringify(storage));
    storeContext.dispatch({ type: ACTIONS.ITEMS_NUMBER });
  }
  return (
    <div className="product">
      <div className="product-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="product-title">
        <h2>{item.title}</h2>
      </div>
      <div className="item-description">
        <p>{item.description}</p>
      </div>
      <div className="product-price">
        {cartInLocal?.find((elem) => elem.id === item.id) ? (
          <FaCartPlus
            className="cart-icon"
            style={{
              color: "red",
            }}
          />
        ) : (
          <FaShoppingCart onClick={() => toCart(item)} className="cart-icon" />
        )}
      </div>
    </div>
  );
};

export default Product;
