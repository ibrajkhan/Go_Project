import React from "react";
import { removeToken } from "../utils/authOperations";

import "./header.css";

function Header() {
  return (
    <div className="header">
      {console.log("header component rendering")}
      <label className="title__header">Shopping Cart</label>
      <nav className="Navbar">
        <div className="list__item">Pricing</div>
        <div className="list__item">Career</div>
        <a
          className="user__header list__item"
          onClick={() => {
            removeToken();
          }}
          href="/"
        >
          <img
            className="user__img"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            alt="user"
          />
          <p>{localStorage.getItem("user")}</p>
        </a>
      </nav>
    </div>
  );
}

export default Header;
