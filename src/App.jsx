import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ProductsPage from "./pages/ProductsPage";
import Sidebar from "./components/SideBar";
import Card from "./components/Productcard";
import OrdersList from "./components/OrdersList"; 
import products from "./data/products.json";
import "./App.css";

export default function App() {
  
  return (
    <div className="app-container">
      <div className="app-sidebar">
        <Sidebar/>

      </div>
      <div className="app-main">
        <Routes>

          <Route path="/" element={<Dashboard/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
          <Route path="/orders/:id" element={<OrderDetails/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
        </Routes>
      </div>
      

    </div>
  );
}