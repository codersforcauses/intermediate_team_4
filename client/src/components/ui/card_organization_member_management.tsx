import React from "react";

import { Member_Details_Interface } from "./card_organization_member_details_modal";

// 1. Define the shape of the data this modal expects
interface Member_Management_Interface {
  onItemClick: (data: Member_Details_Interface) => void;
  itemData: Member_Details_Interface; // Data of the item to display
}

// 2. The Functional Component
const Card_Organization_Member_Management: React.FC<
  Member_Management_Interface
> = ({ onItemClick, itemData }) => {
  return (
    <div
      className="inventory-card"
      onClick={() => onItemClick(itemData)}
      style={{ cursor: "pointer" }}
    >
      <h2 className="member-name">{itemData.name}</h2>
      <p className="member-detail">{itemData.email}</p>
      <p className="member-detail">{itemData.joinedOn}</p>
      <span className="member-category">
        {itemData.permissionLevel || "Member"}
      </span>
    </div>
  );
};

export default Card_Organization_Member_Management;
