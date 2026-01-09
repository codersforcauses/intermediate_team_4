// @author sylee212
// src/components/ui/card_organization_inventory_status_data.tsx

/* 
Idea for this how the recent activities like Recently Borrowed Items will be displayed
- This component represents a single item in the inventory status list, showing the item name and its status detail.


card_organization_inventory_status_card.tsx 
- uses mulitple of this component to show the list
- the card also is just to hold the data and the View All link
*/

import React from "react";

import { Inventory_Details_Interface } from "./card_organization_inventory_details_modal";

interface Inventory_Status_Data_Interface {
  dataName: string; // e.g., "Cool Potato"
  dataStatus: string; // e.g., "In 2 days" or "5 mins ago"

  // NEW: A prop that is the function passed from the parent component
  onItemClick: (itemData: Inventory_Details_Interface) => void;
  data: Inventory_Details_Interface; // The full data object for this specific item
}

const Inventory_Status_Data: React.FC<Inventory_Status_Data_Interface> = ({
  dataName,
  dataStatus,
  onItemClick,
  data,
}) => {
  return (
    <div className="inv-status-item" onClick={() => onItemClick(data)}>
      <span className="inv-item-name">{dataName}</span>
      <span className="inv-item-detail">{dataStatus}</span>
    </div>
  );
};

export type { Inventory_Status_Data_Interface };
export default Inventory_Status_Data;
