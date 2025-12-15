// src/components/ui/card_organization_inventory_status_data.tsx

/* 
Idea for this how the recent activities like Recently Borrowed Items will be displayed
- This component represents a single item in the inventory status list, showing the item name and its status detail.


card_organization_inventory_status_card.tsx 
- uses mulitple of this component to show the list
- the card also is just to hold the data and the View All link
*/

import React from "react";

interface InventoryItemProps {
  itemName: string; // e.g., "Cool Potato"
  statusDetail: string; // e.g., "In 2 days" or "5 mins ago"
}

const InventoryStatusItem: React.FC<InventoryItemProps> = ({
  itemName,
  statusDetail,
}) => {
  return (
    <div className="inv-status-item">
      <span className="inv-item-name">{itemName}</span>
      <span className="inv-item-detail">{statusDetail}</span>
    </div>
  );
};

export type { InventoryItemProps };
export default InventoryStatusItem;
