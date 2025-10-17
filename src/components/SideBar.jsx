import React from "react";
import "./Sidebar.css"; // we’ll style it after

export default function Sidebar({ onNavigate, active }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">📦 Elghousni</h2>

      <ul className="sidebar-menu">
        <li
          className={active === "products" ? "active" : ""}
          onClick={() => onNavigate("products")}
        >
          🛍️ Produits
        </li>
        <li
          className={active === "panier" ? "active" : ""}
          onClick={() => onNavigate("panier")}
        >
          🛒 Panier
        </li>
        <li
          className={active === "commands" ? "active" : ""}
          onClick={() => onNavigate("commands")}
        >
          📦 Commandes
        </li>
      </ul>
    </div>
  );
}
