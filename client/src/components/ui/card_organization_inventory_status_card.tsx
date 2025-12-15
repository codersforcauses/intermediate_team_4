// src/components/card_organization_inventory_status_card.tsx

/*
This is to hold the inventory status summary cards like Expiring Inventory, Inventory Due, Borrowed Items, Returned Items
- Each card shows a list of items with their status details
- it also requires a list of items to display, passed as props
- Also includes a "View All" link to navigate to the full list page
*/

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
