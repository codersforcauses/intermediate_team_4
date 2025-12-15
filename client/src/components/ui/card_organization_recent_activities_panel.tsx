// src/components/RecentActivityPanel.tsx

import Link from "next/link"; // For the 'View All' link
import React from "react";

import RecentActivityItem from "./card_organization_recent_activities_item"; // Import the item component

// Example data structure that the component might use (or receive as props later)
const mockActivityData = [
  {
    status: "up" as const,
    title: "New Member",
    detail: "Cody",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    status: "up" as const,
    title: "Inventory increase",
    detail: "Cool Potato",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  // Add more items here...
];

const RecentActivityPanel = () => {
  return (
    <div className="recent-activity-card">
      {/* Header with Title and View All Link */}
      <div className="activity-card-header">
        <h2 className="activity-card-title">Recent Activity</h2>
        <Link href="/activity/all" legacyBehavior>
          <a className="activity-view-all">View All</a>
        </Link>
      </div>

      {/* The Activity List */}
      <div className="activity-list">
        {
          // Use the JavaScript map function to render one RecentActivityItem for each data entry
          mockActivityData.map((item, index) => (
            <RecentActivityItem
              key={index} // Key is necessary for lists in React
              status={item.status}
              title={item.title}
              detail={item.detail}
              quantity={item.quantity}
              time={item.time}
              // We'll add 'type' later if we need different styling for items vs. members
              type={"member"} // Temporary type assignment
            />
          ))
        }
      </div>
    </div>
  );
};

export default RecentActivityPanel;
