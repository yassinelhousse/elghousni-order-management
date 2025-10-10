import React, { useState } from "react";
import products from "../data/products.json";

export default function OrderForm({ onAddOrder }) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName || !phone || !selectedProduct) {
      setError("⚠️ Veuillez remplir tous les champs et choisir un produit.");
      return;
    }

    const product = products.find((p) => p.id === Number(selectedProduct));

    const newOrder = {
      id: Date.now(),
      clientName,
      phone,
      productName: product.name,
      image: product.image,
      price: product.price,
      date: new Date().toLocaleString(),
      status: "pending",
    };

    onAddOrder(newOrder);

    // Reset form
    setClientName("");
    setPhone("");
    setSelectedProduct(null);
    setError("");
    alert("✅ Commande ajoutée avec succès !");
  };

  return (
    <div className="order-form">
      <h2>🧾 Nouvelle Commande</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nom du client :</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Entrez le nom du client"
        />

        <label>Numéro de téléphone :</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="06xxxxxxxx"
        />

        <label>Produit :</label>
        <select
          value={selectedProduct || ""}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Sélectionnez un produit --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.price} Dh
            </option>
          ))}
        </select>

        <button type="submit" className="submit-btn">
          Créer la commande
        </button>
      </form>
    </div>
  );
}
