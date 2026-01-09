// src/components/ui/Statistics_Card.tsx

import React from "react";

/*
Interface
This component represents a single statistics card used in the organization dashboard.
So when you use this interaface, you can put in this data

example usage:
<Statistics_Card 
    title="Total Borrowed" 
    value={50} 
    delta="+3 this week" 
    status="up" 
/>
*/
interface Statistics_Card_Interface {
  title: string; // The card title (e.g., "Total Inventory")
  value: number; // The main numerical value (e.g., 30)
  delta: string; // The change string (e.g., "+3 this week")
  status: "up" | "down"; // Controls the color and direction of the arrow
}

/*
React.FC<Statistics_Card_Interface>
- React.FC<> stands for React Functional Component 

{ title, value, delta, status }
- Destructuring the props object to directly access title, value, delta, and status
*/
const Statistics_Card: React.FC<Statistics_Card_Interface> = ({
  title,
  value,
  delta,
  status,
}) => {
  // Logic to determine the arrow character and color
  const arrow = status === "up" ? "↑" : "↓";
  // Using CSS variables for colors defined in organization.css
  // var() is a native function for css
  const deltaColor =
    status === "up" ? "var(--color-success)" : "var(--color-error)";

  return (
    // The main gray box container
    <div className="stat-card">
      {/* Arrow Indicator at the top right */}
      {/* why {{ instead of {} }}, that is because, first is to go in to js script, second is that style only accepts js objects*/}
      <div className="stat-indicator" style={{ color: deltaColor }}>
        {arrow}
      </div>

      {/* Main Content */}
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
        {/* why {{ instead of {} }}, that is because, first is to go in to js script, second is that style only accepts js objects*/}
        <p className="stat-delta" style={{ color: deltaColor }}>
          {delta}
        </p>
      </div>
    </div>
  );
};

export default Statistics_Card;
