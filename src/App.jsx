import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import Card from "./components/Productcard";

import products from "./data/products.json";
import "./App.css";

export default function App() {

  const [activePage, setActivePage] = useState("products");
  const [orders, setOrders] = useState([]);

  // handle commander button when you click
  const handleCommand = (product) => {
    const newOrder = {
      id: Date.now(), // give a unique id
      productName: product.name,
      price: product.price,
      image: product.image,
      date: new Date().toLocaleDateString(),
    };

    setOrders([...orders, newOrder]);
    alert(`${product.name} a été ajouté à la commande ✅`);
  };

  // Navigation callback for side bar
  const handleNavigate = (page) => {
    setActivePage(page);
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
          <div className="orders-list">
            <h2>🧾 Liste des Commandes</h2>
            {orders.length === 0 ? (
              <p>Aucune commande pour le moment.</p>
            ) : (
              <ul>
                {orders.map((o) => (
                  <li key={o.id}>
                    <img src={o.image} alt={o.productName} width="50" />
                    <strong>{o.productName}</strong> — {o.price} Dh —{" "}
                    <small>{o.date}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
