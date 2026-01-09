// src/components/card_organization_inventory_details_modal.tsx

/*
Simple modal is overlays 

How does the overlay work?
1. The item itself: which is the trigger, when clicked, it sets the state to open the modal and passes the ID to the panel
2. The panel itself: which just passes the state change and ID to the page
3. The page receives the state sent by panel and sends to the overlay, which since its true, it returns somethign to the page which is the overlay

Key components
1. item itself which will be clicked on 
1.1. A panel to hold the item
2. The page to manage the state and render the overlay
3. The overlay component itself
*/

import Link from "next/dist/client/link";
import React from "react";

import { deleteItemClean } from "./backend/organization_clean_backend_calls";

// Define the shape of the data this modal expects
// id? means optional
export interface Member_Details_Interface {
  // basic info
  id?: number;
  name: string;
  email: string;
  phoneNumber?: string;
  notes?: string;

  // admin info
  permissionLevel?: string;
  joinedOn?: string;
  isStillHere?: boolean;

  // borrow info
  itemsBorrowed?: number;
  lastBorrowedOn?: string;

  // friends info
  totalFriends?: number;
  friends?: Member_Details_Interface[];

  // clubs info
  totalClubs?: number;
  clubs?: string[];
}

// to control the overlay modal visibility and data
interface Member_Details_Modal_Interface {
  isOpen: boolean;
  onClose: () => void;
  itemData: Member_Details_Interface | null; // Data of the item to display
}

export const Member_Details_Modal: React.FC<Member_Details_Modal_Interface> = ({
  isOpen,
  onClose,
  itemData,
}) => {
  // 1. CONTROL: If it's not open or data is missing, render nothing.
  if (!isOpen || !itemData) return null;

  return (
    // 2. RENDER: When 'isOpen' is true, this entire structure is placed on the screen.
    <div className="modal-overlay">
      <div className="modal-content">
        {/*CLOSING: When the close button is clicked, it calls the 'onClose' function 
              which updates the state in the ActivityPage (Step 1) */}
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>

        {/* ... Modal content rendered using itemData.name, itemData.details, etc. ... */}
        <div className="modal-body">
          <h1>Item ID: {itemData.id}</h1>
          <h2>Member Name: {itemData.name}</h2>
          <p>Email: {itemData.email}</p>
          <p>Phone Number: {itemData.phoneNumber}</p>
          <p>Notes: {itemData.notes}</p>
          <p>Permission Level: {itemData.permissionLevel}</p>
          <p>Joined On: {itemData.joinedOn}</p>
          <p>Is Still Here: {itemData.isStillHere ? "Yes" : "No"}</p>
          <p>Items Borrowed: {itemData.itemsBorrowed}</p>
          <p>Last Borrowed On: {itemData.lastBorrowedOn}</p>
          <p>Total Friends: {itemData.totalFriends}</p>
          <div>
            <h3>Friends:</h3>
            <ul>
              {itemData.friends &&
                itemData.friends.map((friend, index) => (
                  <li key={index}>
                    {friend.name} ({friend.email})
                  </li>
                ))}
            </ul>
          </div>
          <p>Total Clubs: {itemData.totalClubs}</p>
          <div>
            <h3>Clubs:</h3>
            <ul>
              {itemData.clubs &&
                itemData.clubs.map((club, index) => (
                  <li key={index}>{club}</li>
                ))}
            </ul>
          </div>
        </div>

        {/* NEW ACTION BUTTONS */}
        <div className="modal-actions">
          <Link
            href={{
              pathname: "/organization_add_member",
              query: {
                mode: "modify",
                data: JSON.stringify(itemData),
              },
            }}
          >
            <div className="modal-action-button secondary">Modify</div>
          </Link>

          {/*   // PENDING */}
          <button
            onClick={() => deleteItemClean(itemData.id || 0)}
            className="modal-action-button secondary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
