import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <nav style={{ textAlign: "center" }}>
      <ul style={{ listStyle: "none" }}>
        <li style={{ display: "inline", marginRight: "10px" }}>
          <Link to="/">News</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/newest">Newest</Link>
        </li>
      </ul>
    </nav>
  );
};
