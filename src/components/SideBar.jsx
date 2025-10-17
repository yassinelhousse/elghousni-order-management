import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const activeClass = ({ isActive }) => (isActive ? "active" : "");
  return (
    <div className="sidebar">
      <ul className="menu">
        <li><NavLink to="/" className={activeClass}>Dashboard</NavLink></li>
        <li><NavLink to="/orders" className={activeClass}>COmmandes</NavLink></li>
        <li><NavLink to="/products" className={activeClass}>Prouduit</NavLink></li>

       
      </ul>
    </div>
  );
}
