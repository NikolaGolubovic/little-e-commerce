import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StoreContext as Store } from "./contexts/storeContext";
import "./App.css";
import Homepage from "./components/Homepage";
import Products from "./components/Products";

function App() {
  const StoreContext = useContext(Store);
  useEffect(() => {
    console.log(StoreContext.test);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="products/*" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
