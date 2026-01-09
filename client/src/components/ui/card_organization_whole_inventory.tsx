// @author sylee212
import React from "react";

import { Inventory_Details_Interface } from "./card_organization_inventory_details_modal";

// 1. Define the shape of the data this modal expects
interface Whole_Inventory_Modal_Interface {
  onItemClick: (data: Inventory_Details_Interface) => void;
  itemData: Inventory_Details_Interface; // Data of the item to display
}

// 2. The Functional Component
const Card_Organization_Whole_Inventroy: React.FC<
  Whole_Inventory_Modal_Interface
> = ({ onItemClick, itemData }) => {
  return (
    <div
      className="inventory-card"
      onClick={() => onItemClick(itemData)}
      style={{ cursor: "pointer" }}
    >
      <h2 className="item-name">{itemData.name}</h2>
      <p className="item-detail">{itemData.details}</p>
      <span className="item-category">{itemData.categories || "General"}</span>
    </div>
  );
};

export default Card_Organization_Whole_Inventroy;
