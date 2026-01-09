// src/components/card_organization_recent_activities_item.tsx

import React from "react";

import { Inventory_Details_Interface } from "./card_organization_inventory_details_modal";

// Define the shape of the data for a single activity item
interface Recent_Activities_Item_Interface {
  type: "increase" | "decrease" | "member" | null;
  status: "up" | "down";
  time: string;

  data: Inventory_Details_Interface;

  onItemClick: (data: Inventory_Details_Interface) => void; // Click handler is mandatory here to work
}

const Recent_Activities_Item: React.FC<Recent_Activities_Item_Interface> = ({
  type,
  status,
  time,
  data,

  onItemClick,
}) => {
  // Logic to determine arrow symbol and color
  const arrow = status === "up" ? "↑" : "↓";

  // Use CSS Variables defined in organization.css
  const statusColor =
    status === "up" ? "var(--color-success)" : "var(--color-error)";

  // Format quantity to include + or - sign
  // const formattedQuantity = `${quantity > 0 ? "+" : ""}${quantity}`;

  return (
    /* When clicked, it sends its specific 'id' back up the chain to the Page */
    <div
      className="activity-item"
      onClick={() => onItemClick(data)}
      style={{ cursor: "pointer" }}
    >
      <div className="activity-status" style={{ color: statusColor }}>
        {arrow}
      </div>

      <div className="activity-info">
        <p className="activity-title">{data.name}</p>
        <p className="activity-detail">{data.details}</p>
        <p className="activity-type">{type}</p>
      </div>

      <div className="activity-meta">
        <span className="activity-time">{time}</span>
      </div>
    </div>
  );
};

export default Recent_Activities_Item;

/*

        <span className="activity-quantity" style={{ color: statusColor }}>
          {formattedQuantity}
        </span>
*/
