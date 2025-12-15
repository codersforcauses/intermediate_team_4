// src/components/InventoryStatusCard.tsx

import Link from "next/link";
import React from "react";

import InventoryStatusItem, {
  InventoryItemProps,
} from "./card_organization_inventory_status_data";

interface InventoryStatusCardProps {
  title: string; // e.g., "Expiring Inventory"
  viewAllHref: string; // The link for the View All button
  items: InventoryItemProps[]; // Array of the items to display (using the InventoryItemProps interface)
}

const InventoryStatusCard: React.FC<InventoryStatusCardProps> = ({
  title,
  viewAllHref,
  items,
}) => {
  return (
    <div className="inv-status-card">
      {/* Header with Title and View All Link */}
      <div className="inv-card-header">
        <h3 className="inv-card-title">{title}</h3>
        <Link href={viewAllHref} legacyBehavior>
          <a className="inv-view-all">View All</a>
        </Link>
      </div>

      {/* Item List */}
      <div className="inv-item-list">
        {items.map((item, index) => (
          <InventoryStatusItem
            key={index}
            itemName={item.itemName}
            statusDetail={item.statusDetail}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryStatusCard;
