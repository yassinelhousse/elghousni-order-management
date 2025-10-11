import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import Card from "./components/Productcard";
import OrdersList from "./components/OrdersList"; 
import products from "./data/products.json";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("products");
  const [orders, setOrders] = useState([]);

  //  When user clicks "Commander"
  const handleCommand = (product) => {
    const newOrder = {
      id: Date.now(), // unique id
      productName: product.name,
      price: product.price,
      image: product.image,
      date: new Date().toLocaleDateString(),
      status: "pending", // default status
    };

    setOrders([...orders, newOrder]);
    alert(`${product.name} a été ajouté à la commande ✅`);
  };

  //  Navigation
  const handleNavigate = (page) => {
    setActivePage(page);
  };

  //  Change order status
  const handleChangeStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  //  Delete order
  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-sidebar">
        <Sidebar onNavigate={handleNavigate} active={activePage} />
      </div>

      <div className="app-card">
        {activePage === "products" && (
          <div className="product-list">
            {products.map((p) => (
              <Card
                key={p.id}
                name={p.name}
                price={p.price}
                image={p.image}
                onCommand={() => handleCommand(p)}
              />
            ))}
          </div>
        )}

        {activePage === "commands" && (
          <OrdersList
            orders={orders}
            onChangeStatus={handleChangeStatus}
            onDelete={handleDeleteOrder}
          />
        )}
      </div>
    </div>
  );
}
