import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
const Products = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setItems(res.data));
  });
  return (
    <div className="products">
      <select name="cars" id="cars">
        <option value="desc">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
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
      {items.map((item) => {
        // category, description, id, image, price, rating {rate, count}, title
        return (
          <>
            <div className="product-item" key={item.id}>
              <div className="item-image">
                <a href={`/product/${item.title}`}>
                  <img src={item.image} alt={item.description} />
                </a>
              </div>
              <div className="item-title">
                <a href={`/product/${item.title}`}>{item.title}</a>
              </div>
              <div className="item-price">
                <p>{item.price}$</p>
              </div>
              <div className="item-cart-add">
                <FaCartPlus className="cart-icon" />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Products;
