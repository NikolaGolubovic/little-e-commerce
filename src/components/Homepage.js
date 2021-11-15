import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage">
        <h1>Wellcome</h1>
        <Link to="/products">Check our products</Link>
      </div>
    </div>
  );
};

export default Homepage;
