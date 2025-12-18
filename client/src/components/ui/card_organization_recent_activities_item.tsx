// src/components/card_organization_recent_activities_item.tsx

import React from "react";

// Define the shape of the data for a single activity item
interface Recent_Activities_Item_Interface {
  id: number; // Ensure id is part of the interface
  type: "increase" | "decrease" | "member" | null;
  status: "up" | "down";
  title: string;
  detail: string;
  quantity: number;
  time: string;
  onItemClick: (id: number) => void; // Click handler is mandatory here to work
}

const Recent_Activities_Item: React.FC<Recent_Activities_Item_Interface> = ({
  id, // You must destructure 'id' here to use it below
  type,
  status,
  title,
  detail,
  quantity,
  time,
  onItemClick,
}) => {
  // Logic to determine arrow symbol and color
  const arrow = status === "up" ? "↑" : "↓";

  // Use CSS Variables defined in organization.css
  const statusColor =
    status === "up" ? "var(--color-success)" : "var(--color-error)";

  // Format quantity to include + or - sign
  const formattedQuantity = `${quantity > 0 ? "+" : ""}${quantity}`;

  return (
    /* When clicked, it sends its specific 'id' back up the chain to the Page */
    <div
      className="activity-item"
      onClick={() => onItemClick(id)}
      style={{ cursor: "pointer" }}
    >
      <div className="activity-status" style={{ color: statusColor }}>
        {arrow}
      </div>

      <div className="activity-info">
        <p className="activity-title">{title}</p>
        <p className="activity-detail">{detail}</p>
        <p className="activity-type">{type}</p>
      </div>

      <div className="activity-meta">
        <span className="activity-quantity" style={{ color: statusColor }}>
          {formattedQuantity}
        </span>
        <span className="activity-time">{time}</span>
      </div>
    </div>
  );
};

export default Recent_Activities_Item;
