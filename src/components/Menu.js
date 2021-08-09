import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

export const Menu = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">News</Link>
        </li>
        <li>
          <Link to="/newest">Newest</Link>
        </li>
      </ul>
    </nav>
  );
};
