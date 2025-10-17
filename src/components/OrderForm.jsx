import React, { useState } from "react";
import useStore from "../Store/useStore";
import "./OrdersList.css";

export default function OrderForm() {
  const { panier, addOrder, clearPanier } = useStore(); // panier = products added
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");

  const total = panier.reduce((sum, p) => sum + p.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName || !phone || panier.length === 0) {
      alert("Veuillez remplir toutes les informations et ajouter des produits.");
      return;
    }

    // Create new order
    const newOrder = {
      id: Date.now(),
      clientName,
      phone,
      items: panier,
      total,
      date: new Date().toLocaleString(),
      status: "pending",
    };

    addOrder(newOrder);
    clearPanier();
    setClientName("");
    setPhone("");

    alert("Commande confirmée ✅");
  };

  return (
    <div className="panier-container">
      <h2>🛒 Panier</h2>

      {panier.length === 0 ? (
        <p className="empty">Aucun produit dans le panier.</p>
      ) : (
        <div className="panier-list">
          {panier.map((p) => (
            <div className="panier-item" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div>
                <h4>{p.name}</h4>
                <p>{p.price} MAD</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="total">Total : {total} MAD</h3>

      <form onSubmit={handleSubmit} className="panier-form">
        <input
          type="text"
          placeholder="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" disabled={panier.length === 0}>
          Confirmer la commande
        </button>
      </form>
    </div>
  );
}
