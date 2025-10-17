import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function OrdersList({ orders = [], onChangeStatus, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  const sorted = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {sorted.length === 0 ? <p>Aucune commande.</p> : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sorted.map((order) => {
            const total = order.total ?? (order.price ?? 0);
            return (
              <li key={order.id} style={{ padding: 12, border: "1px solid #eee", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{order.clientName || order.productName || "Client inconnu"}</strong>
                    {" — "}
                    <Link to={`/orders/${order.id}`} style={{ color: "#666" }}>{order.id}</Link>
                    <div style={{ fontSize: 12, color: "#666" }}>{new Date(order.date).toLocaleString()}</div>
                    {order.phone && <div>📞 {order.phone}</div>}
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ padding: "6px 8px", borderRadius: 6, background: "#f3f4f6" }}>{order.status}</div>
                    <select value={order.status} onChange={(e) => onChangeStatus(order.id, e.target.value)}>
                      <option value="pending">En attente</option>
                      <option value="prepared">Préparée</option>
                      <option value="delivered">Livrée</option>
                    </select>

                    <div style={{ fontWeight: 700 }}>{total.toFixed(2)} MAD</div>

                    <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}>{expanded === order.id ? "Masquer" : "Détails"}</button>
                    <button onClick={() => { if (window.confirm("Supprimer ?")) onDelete(order.id); }}>Supprimer</button>
                  </div>
                </div>

                {expanded === order.id && (
                  <div style={{ marginTop: 10 }}>
                    <h4>Produits</h4>
                    <ul>
                      {(order.items || [{ name: order.productName, price: order.price, qty: 1 }]).map((it, idx) => (
                        <li key={idx}>
                          {it.name} × {it.qty} — {(it.price * (it.qty || 1)).toFixed(2)} MAD
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
