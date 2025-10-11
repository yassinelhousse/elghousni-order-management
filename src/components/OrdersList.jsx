import React,{ useMemo,useState} from "react";

/* - orders: array d'objets commande
  - onChangeStatus(orderId, newStatus): callback pour changer le statut
  - onDelete(orderId): callback pour supprimer*/


const STATUS ={
    pending:{label: "En attente", emoji:"🟡", color: "#f1c40f"},
    prepared:{label: "Préparée", emoji:"🔵", color: "#3498db"},
    delivered:{label: "Livrée", emoji:"🟢", color: "#2ecc71"},
    
};
export default function OrdersList({orders = [], onChangeStatus, onDelete}){
    
    const [expanded, setExpanded]= useState(null);//// id de la commande ouverte

    // tri des commandes plus récentes dabord

    const sortedOrders= [...orders].sort(
        (a,b) => new Date(b.date)  -new Date(a.date)
    );

    return (
      <div className="orders-list">
        <h2>📋 Liste des commandes</h2>
        {sortedOrders.length===0 ? (
          <p>Aucune commande pour le moment.</p>
        ) : (
          <ul className="order-items">
            {sortedOrders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <strong>{order.clientName || "Client inconnu" } </strong> -{" "}
                    <span className="order-id">{order.id}</span>
                    <div className="order-date">
                      {new Date(order.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="order-actions">
                    <div 
                      className="order-status"
                      style={{
                        backgroundColor: STATUS[order.status].color + "22",
                        color: STATUS[order.status].color,
                      }}
                    >
                      {STATUS[order.status].emoji} {STATUS[order.status].label}
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onChangeStatus(order.id, e.target.value)
                      }
                    >
                      <option value="pending">En attente</option>
                      <option value="prepared">Préparée</option>
                      <option value="delivered">Livrée</option>
                    </select> 

                    <strong>{order.price} MAD</strong>

                    <button
                      onClick={() =>
                        setExpanded(expanded === order.id ? null : order.id)
                      }
                    >
                      {expanded === order.id ? "Masquer" : "Détails"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>{
                        if (window.confirm("Supprimer cette commande ?"))
                          onDelete(order.id);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                {expanded === order.id && (
                  <div className="order-details">
                    <img src={order.image} alt={order.productName} width="80" />
                    <p>{order.productName}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}