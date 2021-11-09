import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import axios from "axios";
import Tabs from "./Tabs";
import DropDownByPrice from "./DropDownByPrice";

import ItemsPage from "./ItemsPage";

const Products = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPage, setItemsPage] = useState([]);
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllItems();
  }, []);

  function getAllItems() {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setItems(res.data);
      setTotal(res.data.length);
    });
  }
  function handlePageClick(data) {
    setPage(data.selected);
  }
  return (
    <div className="products">
      <DropDownByPrice setPage={setPage} />
      <Tabs
        getAllItems={getAllItems}
        setCategory={setCategory}
        setPage={setPage}
        setTotal={setTotal}
        setItemsPage={setItemsPage}
        items={items}
        page={page}
        category={category}
      />
      <ItemsPage
        itemsPage={itemsPage}
        items={items}
        page={page}
        setItemsPage={setItemsPage}
      />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(total / 5)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={page}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default Products;
