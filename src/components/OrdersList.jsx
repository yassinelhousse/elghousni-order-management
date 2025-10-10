import React,{ useMemo,useState} from "react";

/* - orders: array d'objets commande
  - onChangeStatus(orderId, newStatus): callback pour changer le statut
  - onDelete(orderId): callback pour supprimer*/




const STATUS ={
    pending:{label: "En attente", emoji:"🟡"},
    prepared:{label: "Prepare", emoji:"🔵"},
    delivered:{label: "Livree", emoji:"🟢"},
    

};
export default function OrdersList({orders = [], onChangeStatus, onDelete}){
    
}