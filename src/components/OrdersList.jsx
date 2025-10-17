import React from "react";
import useStore from "../Store/useStore";
import "./OrdersList.css";

const STATUS = {
  pending: { label: "En attente", color: "#f1c40f", emoji: "🟡" },
  prepared: { label: "Préparée", color: "#3498db", emoji: "🔵" },
  delivered: { label: "Livrée", color: "#2ecc71", emoji: "🟢" },
};

export default function OrdersList() {
  const { orders, changeStatus, deleteOrder } = useStore();
  

  const handleNextStatus = (current) => {
    if (current === "pending") return "prepared";
    if (current === "prepared") return "delivered";
    return "delivered";
  };

  return (
    <div className="orders-container">
      <h2>📦 Liste des Commandes</h2>

      {orders.length === 0 ? (
        <p className="empty">Aucune commande pour le moment.</p>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div className="order-card" key={o.id}>
              <div className="order-header">
                <h3>Commande #{o.id}</h3>
                <span
                  className="status"
                  style={{ backgroundColor: STATUS[o.status].color }}
                >
                  {STATUS[o.status].emoji} {STATUS[o.status].label}
                </span>
              </div>

              <div className="order-body">
                <p><strong>Client :</strong> {o.clientName}</p>
                <p><strong>Téléphone :</strong> {o.phone}</p>
                <p><strong>Date :</strong> {o.date}</p>
                <p><strong>Total :</strong> {o.total} MAD</p>

                <details className="order-details">
                  <summary>Voir les produits</summary>
                  {o.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <span>{item.name} — {item.price} MAD</span>
                    </div>
                  ))}
                </details>
              </div>

              <div className="order-footer">
                {o.status !== "delivered" && (
                  <button
                    className="btn-status"
                    onClick={() =>
                      changeStatus(o.id, handleNextStatus(o.status))
                    }
                  >
                    Changer Statut
                  </button>
                )}
                <button className="btn-delete" onClick={() => deleteOrder (o.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
