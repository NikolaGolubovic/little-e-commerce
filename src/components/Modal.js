import React, { useContext } from "react";
import ReactDOM from "react-dom";

import ACTIONS from "../reducer/actions";
import { StoreContext } from "../contexts/storeContext";

import { MdClose } from "react-icons/md";

const Modal = ({ openModal, itemName }) => {
  const storeContext = useContext(StoreContext);
  const { dispatch } = storeContext;
  if (!openModal) return null;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal">
        <p>{itemName} is successfully added to your cart</p>{" "}
        <span onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}>
          <MdClose />
        </span>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
