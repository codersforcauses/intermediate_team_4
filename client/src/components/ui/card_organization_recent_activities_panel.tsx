// src/components/card_organization_recent_activities_panel.tsx

/*
How does it show all the components in the list?
1. pass the list of data from the mockActivityData array
2. use the map function to iterate over each item in the array
3. for each item, render a RecentActivityItem component, passing the relevant props

so what happens is, it will run the map and iterate over every item and then create a RecentActivityItem component 
for each one, passing in the data and placing it under the div with class activity-list
*/

import Link from "next/link"; // For the 'View All' link
import React from "react";

import Recent_Activities_Item from "./card_organization_recent_activities_item";

// Example data structure that the component might use (or receive as props later)
const mockActivityData = [
  {
    id: 1,
    type: "member" as const,
    status: "up" as const,
    title: "New Member",
    detail: "Cody",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "member" as const,
    status: "up" as const,
    title: "Inventory increase",
    detail: "Cool Potato",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    id: 3,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 4,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 5,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 6,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 7,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 8,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 9,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 10,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 11,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 12,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 13,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 14,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 15,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 16,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  // Add more items here...
];

// Define the interface for the Panel so it knows it receives onItemClick
interface Recent_Activity_Panel_Props {
  onItemClick: (id: number) => void;
}

const Recent_Activity_Panel: React.FC<Recent_Activity_Panel_Props> = ({
  onItemClick,
}) => {
  return (
    <div className="recent-activity-card">
      {/* Header with Title and View All Link */}
      <div className="activity-card-header">
        <h2 className="activity-card-title">Recent Activity</h2>
        <Link href="/organization_activity" legacyBehavior>
          <a className="activity-view-all">View All</a>
        </Link>
      </div>

      {/* The Activity List */}
      {/* react requires a key for each item in list */}
      <div className="activity-list">
        {
          // Use the JavaScript map function to render one RecentActivityItem for each data entry
          mockActivityData.map((item, index) => (
            <Recent_Activities_Item
              key={index}
              id={item.id} // Pass the id to the item
              type={item.type} // type is not used in the item but required by interface
              status={item.status}
              title={item.title}
              detail={item.detail}
              quantity={item.quantity}
              time={item.time}
              // PASS THE HANDLER DOWN TO THE ITEM
              onItemClick={onItemClick}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Recent_Activity_Panel;
