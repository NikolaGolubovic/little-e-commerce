import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../contexts/storeContext";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import ACTIONS from "../reducer/actions";

const storageName = "little-shop-practice";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [sum, setSum] = useState(0);

  const storeContext = useContext(StoreContext);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(storageName)));
    getTotal();
  }, []);
  function upQuantity(id, copyNum) {
    const cartInLocal = JSON.parse(window.localStorage.getItem(storageName));
    const moreCopy = cartInLocal.map((elem) =>
      elem.id === id ? { ...elem, quantity: elem.quantity + 1 } : elem
    );
    window.localStorage.setItem(storageName, JSON.stringify(moreCopy));
    setItems(moreCopy);
    storeContext.dispatch({ type: ACTIONS.ITEMS_NUMBER });
    getTotal();
  }
  function downQuantity(id, copyNum) {
    const cartInLocal = JSON.parse(window.localStorage.getItem(storageName));
    const lessCopy = cartInLocal.map((elem) =>
      elem.id === id
        ? { ...elem, quantity: elem.quantity > 2 ? elem.quantity - 1 : 1 }
        : elem
    );
    window.localStorage.setItem(storageName, JSON.stringify(lessCopy));
    setItems(lessCopy);
    storeContext.dispatch({ type: ACTIONS.ITEMS_NUMBER });
    getTotal();
  }
  function getTotal() {
    const cart = JSON.parse(window.localStorage.getItem(storageName));
    if (cart === null) {
      setSum(0);
      return;
    }
    const sum = cart.reduce((previous, current) => {
      return previous + current.quantity * current.price;
    }, 0);
    setSum(sum.toFixed(2));
  }
  function removeItem(id) {
    const cart = JSON.parse(window.localStorage.getItem(storageName));
    const filtered = cart.filter((elem) => elem.id !== id);
    localStorage.setItem(storageName, JSON.stringify(filtered));
    setItems(filtered);
    getTotal();
    storeContext.dispatch({ type: ACTIONS.ITEMS_NUMBER });
  }
  return (
    <div className="cart-container">
      {items?.map((item, index) => {
        return (
          <div className="cart-item" key={item.id}>
            <div className="item-image">
              <a href={`/product/${item.id}`}>
                <img src={item.image} alt={item.description} />
              </a>
            </div>
            <div className="item-title">
              <a href={`/product/${item.id}`}>
                {item.title.split(" ").slice(0, 2).join(" ")}
              </a>
            </div>
            <div className="item-price">
              <p>{item.price}$</p>
            </div>
            <div className="item-quantity">
              <FaPlus className="cart-fa" onClick={() => upQuantity(item.id)} />{" "}
              <p class="item-quantity-text">{item.quantity}</p>
              <FaMinus
                className="cart-fa"
                onClick={() => downQuantity(item.id)}
              />
            </div>
            <div className="remove-item">
              <CgClose
                className="remove-icon"
                onClick={() => removeItem(item.id)}
              />
            </div>
          </div>
        );
      })}
      <div className="total">
        Total: <span>{sum}</span> $
      </div>
    </div>
  );
};

export default Cart;
