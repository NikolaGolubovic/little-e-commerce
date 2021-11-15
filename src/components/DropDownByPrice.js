import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DropDownByPrice = ({ setPage }) => {
  const [openDrop, setOpenDrop] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", function (event) {
      if (!event.target.matches(".dropbtn")) {
        setOpenDrop(false);
      }
    });
  }, []);
  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => {
          setOpenDrop(!openDrop);
        }}
      >
        Order by Price
      </button>
      <div className={openDrop ? " dropdown-content show" : "dropdown-content"}>
        <div
          className="drop-choose"
          onClick={() => {
            navigate({
              search: "?sort=desc",
            });
            setPage(0);
          }}
        >
          Cheaper
        </div>
        <div
          className="drop-choose"
          onClick={() => {
            navigate({
              search: "?sort=asc",
            });
            setPage(0);
          }}
        >
          Expensive
        </div>
      </div>
    </div>
  );
};

export default DropDownByPrice;
