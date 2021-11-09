import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tabs = ({
  getAllItems,
  setCategory,
  setPage,
  setTotal,
  setItemsPage,
  items,
  page,
  category,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const TabsNames = [
    "All",
    "Electronics",
    "Jewelery",
    "Women's Clothing",
    "Men's Clothing",
  ];
  useEffect(() => {
    if (category) {
      setItemsPage(
        items
          .filter((item) => {
            return item.category === category.toLowerCase();
          })
          .slice(page * 5, page * 5 + 5)
      );
    } else {
      setItemsPage(items.slice(page * 5, page * 5 + 5));
    }
  }, [items, page, category, setItemsPage]);
  function changeTab(e, index) {
    if (e.target.textContent === "All") {
      getAllItems();
      setCategory("");
      setActive(index);
      return;
    }
    getCategory(e.target.textContent);
    setCategory(e.target.textContent);
    navigate("/products");
    setPage(0);
    setActive(index);
  }
  function getCategory(category) {
    const filteredData = items.filter(
      (item) => item.category === category.toLowerCase()
    );
    setTotal(filteredData.length);
    setItemsPage(filteredData.slice(0, page * 5 + 5));
  }
  return (
    <div className="tabs">
      {TabsNames.map((name, index) => {
        return (
          <button
            className={index === active ? "tab active" : "tab"}
            onClick={(e) => changeTab(e, index)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
