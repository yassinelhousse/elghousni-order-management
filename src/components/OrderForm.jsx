import React, { useState } from "react";
import useStore from "../store/useStore";

export default function OrderForm({ onAddOrder }) {
  const { products } = useStore();
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState([]); // {id, name, price, qty}

  // add one product or increase qty
  const addProduct = (p) => {
    setSelected((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setSelected((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  };

  const removeItem = (id) => setSelected((prev) => prev.filter((x) => x.id !== id));

  const subtotal = selected.reduce((s, it) => s + it.price * it.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !phone || selected.length === 0) {
      alert("Veuillez remplir le nom, téléphone et sélectionner au moins un produit.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      clientName,
      phone,
      items: selected,
      total: subtotal,
      date: new Date().toISOString(),
      status: "pending",
    };

    onAddOrder(newOrder);

    // reset
    setClientName("");
    setPhone("");
    setSelected([]);
  };

  return (
    <div style={{ marginBottom: 20, background: "#fff", padding: 16, borderRadius: 10 }}>
      <h3>📝 Créer une commande</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input placeholder="Nom du client" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <input placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 12 }}>
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            <h4>Catalogue</h4>
            {products.map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #eee" }}>
                <div>{p.name}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ minWidth: 60, textAlign: "right" }}>{p.price} MAD</div>
                  <button type="button" onClick={() => addProduct(p)}>+ Ajouter</button>
                </div>
              </div>
            ))}
          </div>

          <aside style={{ background: "#fafafa", padding: 10, borderRadius: 8 }}>
            <h4>Panier</h4>
            {selected.length === 0 && <div>Aucun produit sélectionné</div>}
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selected.map((it) => (
                <li key={it.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div className="small">{it.price} MAD</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="number" value={it.qty} min="1" onChange={(e) => updateQty(it.id, Number(e.target.value))} style={{ width: 60 }} />
                    <div style={{ width: 80, textAlign: "right" }}>{(it.price * it.qty).toFixed(2)} MAD</div>
                    <button type="button" onClick={() => removeItem(it.id)}>✕</button>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <strong>Total</strong>
              <strong>{subtotal.toFixed(2)} MAD</strong>
            </div>

            <button type="submit" style={{ marginTop: 12 }}>Créer commande</button>
          </aside>
        </div>
      </form>
    </div>
  );
}
