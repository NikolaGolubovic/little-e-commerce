import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../contexts/storeContext";
import ACTIONS from "../reducer/actions";

const Nav = () => {
  const storeContext = useContext(StoreContext);

  const dispatch = storeContext.dispatch;

  useEffect(() => {
    dispatch({ type: ACTIONS.ITEMS_NUMBER });
  }, []);
  return (
    <nav>
      <NavLink
        end
        to="/"
        className={({ isActive }) =>
          "nav-link" + (isActive ? " activated" : "")
        }
      >
        Home
      </NavLink>
      <NavLink
        end
        to="/products"
        className={({ isActive }) =>
          "nav-link" + (isActive ? " activated" : "")
        }
      >
        Prodcuts
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          "nav-link" + (isActive ? " activated" : "")
        }
      >
        <FaShoppingCart className="nav-cart" />{" "}
        <span>{storeContext.cartQuantity}</span>
      </NavLink>
    </nav>
  );
};

export default Nav;
