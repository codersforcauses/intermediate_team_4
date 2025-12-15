// src/components/card_organization_recent_activities_item.tsx

import React from "react";

// Define the shape of the data for a single activity item
interface ActivityItemProps {
  type: "increase" | "decrease" | "member"; // e.g., Inventory increase, Lost Member
  status: "up" | "down"; // Green or Red arrow
  title: string; // Main action (e.g., "New Member", "Inventory increase")
  detail: string; // The item or person involved (e.g., "Cody", "Cool Potato")
  quantity: number; // The numerical change (e.g., +1, -1)
  time: string; // The time elapsed (e.g., "5 minutes ago")
}

const RecentActivityItem: React.FC<ActivityItemProps> = ({
  status,
  title,
  detail,
  quantity,
  time,
}) => {
  // Logic to determine arrow symbol and color
  const arrow = status === "up" ? "↑" : "↓";

  // Use CSS Variables defined in organization.css
  const statusColor =
    status === "up" ? "var(--color-success)" : "var(--color-error)";

  // Format quantity to include + or - sign
  const formattedQuantity = `${quantity > 0 ? "+" : ""}${quantity}`;

  return (
    <div className="activity-item">
      {/* 1. Status Arrow */}
      <div className="activity-status" style={{ color: statusColor }}>
        {arrow}
      </div>

      {/* 2. Title and Detail (Stacked) */}
      <div className="activity-info">
        <p className="activity-title">{title}</p>
        <p className="activity-detail">{detail}</p>
      </div>

      {/* 3. Time and Quantity (Aligned Right) */}
      <div className="activity-meta">
        <span className="activity-quantity" style={{ color: statusColor }}>
          {formattedQuantity}
        </span>
        <span className="activity-time">{time}</span>
      </div>
    </div>
  );
};

export default RecentActivityItem;
