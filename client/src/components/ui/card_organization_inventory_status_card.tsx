// src/components/card_organization_inventory_status_card.tsx

/*
This is to hold the inventory status summary cards like Expiring Inventory, Inventory Due, Borrowed Items, Returned Items
- Each card shows a list of items with their status details
- it also requires a list of items to display, passed as props
- Also includes a "View All" link to navigate to the full list page
*/

import Link from "next/link";
import React from "react";

import { Inventory_Details_Interface } from "./card_organization_inventory_details_modal";
import Inventory_Status_Data from "./card_organization_inventory_status_data";

interface Inventory_Status_Card_Interface {
  title: string; // e.g., "Expiring Inventory"
  viewAllHref: string; // The link for the View All button
  data: Inventory_Details_Interface[]; // Array of the items to display (using the Inventory_Details_Interface interface)
  onItemClick: (data: Inventory_Details_Interface) => void; // Optional click handler for items
}

const calcTimeAgo = (dateString: string | undefined): string => {
  // error control
  if (!dateString) return "unknown time";

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

const decideWhichDataField = (
  data: Inventory_Details_Interface,
  field: string,
): string => {
  if (field == "Expiring Inventory") {
    return data.expiryDate ? data.expiryDate : "unknown expiry date";
  } else if (field == "Inventory Due") {
    return data.dueOn ? data.dueOn : "unknown due date";
  } else if (field == "Borrowed Items") {
    return data.borrowedOn ? data.borrowedOn : "unknown borrowed date";
  } else if (field == "Returned Items") {
    return data.returnedOn ? data.returnedOn : "unknown returned date";
  } else {
    return "unknown data";
  }
};

const Inventory_Status_Card: React.FC<Inventory_Status_Card_Interface> = ({
  title,
  viewAllHref,
  data,
  onItemClick,
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
        {data.map((item, index) => (
          <Inventory_Status_Data
            key={index}
            dataName={item.name}
            dataStatus={calcTimeAgo(decideWhichDataField(item, title))} // Replace {wantedDataField} with the actual field name that holds the date/time info
            data={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory_Status_Card;
