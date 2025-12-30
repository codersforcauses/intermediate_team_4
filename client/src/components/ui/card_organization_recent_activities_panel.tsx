// src/components/card_organization_recent_activities_panel.tsx

/*
How does it show all the components in the list?
1. pass the list of data from the mockActivityData array
2. use the map function to iterate over each item in the array
3. for each item, render a RecentActivityItem component, passing the relevant props

so what happens is, it will run the map and iterate over every item and then create a RecentActivityItem component 
for each one, passing in the data and placing it under the div with class activity-list

Note:
the data must already be sorted from the backend before passing the data here. this componenet is just for display. no processing is done here

*/

import Link from "next/link"; // For the 'View All' link
import React from "react";

import { Inventory_Details_Interface } from "./card_organization_inventory_details_modal";
import Recent_Activities_Item from "./card_organization_recent_activities_item";

// Define the interface for the Panel so it knows it receives onItemClick
interface Recent_Activity_Panel_Interface {
  onItemClick: (data: Inventory_Details_Interface) => void;
  data: Inventory_Details_Interface[];
}

const calcTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

const Recent_Activity_Panel: React.FC<Recent_Activity_Panel_Interface> = ({
  onItemClick,
  data,
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
          data.map((item, index) => (
            <Recent_Activities_Item
              key={index}
              type={null} // Placeholder, adjust as needed
              status={Math.random() > 0.5 ? "up" : "down"} // Random status for demo
              time={calcTimeAgo(item.dateAdded)} // Placeholder, adjust as needed
              data={item}
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
