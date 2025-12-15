// src/components/InventoryStatusItem.tsx

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
