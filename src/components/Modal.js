import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import ACTIONS from "../reducer/actions";
import { StoreContext } from "../contexts/storeContext";

import { MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Modal = ({ openModal, itemName }) => {
  const storeContext = useContext(StoreContext);
  const { dispatch } = storeContext;
  useEffect(() => {
    if (openModal) {
      const timeout = setTimeout(() => {
        dispatch({ type: ACTIONS.CLOSE_MODAL });
      }, 7777000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [openModal]);
  if (!openModal) return null;
  return ReactDOM.createPortal(
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          dispatch({ type: ACTIONS.CLOSE_MODAL });
        }
      }}
    >
      <div className="modal">
        <p>{itemName} is successfully added to your cart</p>{" "}
        <Link
          className="modal-to-cart"
          to="/cart"
          onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}
        >
          Go To <FaShoppingCart />
        </Link>
        <span onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}>
          <MdClose />
        </span>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
