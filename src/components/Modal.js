import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ modalOpen, setModalOpen, itemName }) => {
  if (!modalOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal">
        <p>{itemName} is successfully added to your cart</p>
      </div>
    </div>
  );
};

export default Modal;
