import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import Card from "./components/Productcard";
import OrdersList from "./components/OrdersList";
import useStore from "./Store/useStore";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("products");
  const { products, cart, orders, removeFromCart, getCartTotal, confirmOrder } =
    useStore();

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirmOrder = () => {
    confirmOrder(clientName, phone);
    setClientName("");
    setPhone("");
  };

  return (
    <div className="app-container">
      <div className="app-sidebar">
        <Sidebar onNavigate={setActivePage} active={activePage} />
      </div>

      <div className="app-card">
        {/* ✅ PAGE PRODUITS */}
        {activePage === "products" && (
          <div className="product-list">
            {products.map((p) => (
              <Card key={p.id} {...p} />
            ))}
          </div>
        )}

        {/* ✅ PAGE PANIER */}
        {activePage === "panier" && (
          <div className="cart-section">
            <h2>🛒 Panier</h2>
            {cart.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} width="50" alt={item.name} />
                    {item.name} × {item.quantity} — {item.price * item.quantity} Dh
                    <button onClick={() => removeFromCart(item.id)}>
                      ❌ Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* ✅ Formulaire client */}
            {cart.length > 0 && (
              <div className="order-form">
                <h3>Informations du client</h3>
                <input
                  type="text"
                  placeholder="Nom du client"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <p>
                  <strong>Total :</strong> {getCartTotal()} Dh
                </p>

                <button className="confirm-btn" onClick={handleConfirmOrder}>
                  ✅ Confirmer la commande
                </button>
              </div>
            )}
          </div>
        )}

        {/* ✅ PAGE COMMANDES */}
        
        {activePage === "commands" && (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  );
}
