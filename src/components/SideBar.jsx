import React from "react";

export default function Sidebar({ onNavigate, active }) {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li
          className={active === "products" ? "active" : ""}
          onClick={() => onNavigate("products")}
        >
          <a href="#PRODUCTS">PRODUCTS</a>
        </li>
        <li
          className={active === "commands" ? "active" : ""}
          onClick={() => onNavigate("commands")}
        >
          <a href="#COMMANDS">COMMANDS</a>
        </li>
      </ul>
    </div>
  );
}
