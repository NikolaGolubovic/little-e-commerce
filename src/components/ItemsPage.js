import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import ACTIONS from "../reducer/actions";
import { StoreContext } from "../contexts/storeContext";

const ItemsPage = ({ itemsPage, category, items, setItemsPage, page }) => {
  const [cartInLocal, setCartInLocal] = useState([]);

  let location = useLocation();

  const storageName = "little-shop-practice";
  const storeContext = useContext(StoreContext);
  useEffect(() => {
    setCartInLocal(JSON.parse(localStorage.getItem(storageName)));
  }, []);
  useEffect(() => {
    if (location.search.split("=")[1] === "asc") {
      if (category) {
        setItemsPage(
          items
            .filter((item) => item.category === category.toLowerCase())
            .sort((next, previous) => previous.price - next.price)
            .slice(page * 5, page * 5 + 5)
        );
      } else {
        setItemsPage(
          items
            .sort((next, previous) => previous.price - next.price)
            .slice(page * 5, page * 5 + 5)
        );
      }
    } else if (location.search.split("=")[1] === "desc") {
      if (category) {
        setItemsPage(
          items
            .filter((item) => item.category === category.toLowerCase())
            .sort((next, previous) => next.price - previous.price)
            .slice(page * 5, page * 5 + 5)
        );
      } else {
        setItemsPage(
          items
            .sort((next, previous) => next.price - previous.price)
            .slice(page * 5, page * 5 + 5)
        );
      }
    }
  }, [location, items, page, category, setItemsPage]);
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
    storeContext.dispatch({
      type: ACTIONS.OPEN_MODAL,
      payload: { item: item.title.split(" ").slice(0, 3).join(" ") },
    });
  }
  return (
    <div>
      <div className="product-item product-title">
        <div className="item-image">
          <p>Item</p>
        </div>
        <div className="item-title">
          <p>Title</p>
        </div>
        <div className="item-price">
          <p>Price</p>
        </div>
        <div className="item-cart-add"></div>
      </div>
      {itemsPage.map((item, index) => {
        // category, description, id, image, price, rating {rate, count}, title
        return (
          <div className="product-item" key={item.id}>
            <div className="item-image">
              <a href={`/product/${item.id}`}>
                <img src={item.image} alt={item.description} />
              </a>
            </div>
            <div className="item-title">
              <a href={`/product/${item.id}`}>
                {" "}
                {item.title.split(" ").slice(0, 3).join(" ")}
              </a>
            </div>
            <div className="item-price">
              <p>{item.price}$</p>
            </div>
            <div className="item-cart-add">
              {cartInLocal?.find((elem) => elem.id === item.id) ? (
                <FaCartPlus
                  className="cart-icon"
                  style={{
                    color: "red",
                  }}
                />
              ) : (
                <FaShoppingCart
                  onClick={() => toCart(item)}
                  className="cart-icon"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemsPage;
