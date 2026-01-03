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

import React from "react";

// Define the shape of the data this modal expects
// id? means optional
interface Inventory_Details_Interface {
  id?: number;
  name: string;
  details: string;
  categories?: string;
  availability?: string;
  organization?: string;
  collectionPoint: string;
  borrowerName?: string;
  borrowedOn?: string;
  returnedOn?: string;
  dueOn?: string;
  expiryDate: string;
  dateAdded?: string;
}

// to control the overlay modal visibility and data
interface Inventory_Details_Modal_Interface {
  isOpen: boolean;
  onClose: () => void;
  itemData: Inventory_Details_Interface | null; // Data of the item to display
}

const Inventory_Details_Modal: React.FC<Inventory_Details_Modal_Interface> = ({
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
          <h2>Item Name: {itemData.name}</h2>
          <p>Description: {itemData.details}</p>
          <p>Category: {itemData.categories}</p>
          <p>Availability: {itemData.availability}</p>
          <p>Organization: {itemData.organization}</p>
          <p>Borrow Location: {itemData.collectionPoint}</p>
          <p>Borrower Name: {itemData.borrowerName}</p>
          <p>Borrowed On: {itemData.borrowedOn}</p>
          <p>Returned On: {itemData.returnedOn}</p>
          <p>Due On: {itemData.dueOn}</p>
          <p>Expiry Date: {itemData.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export type { Inventory_Details_Interface }; // Exporting the interface for use in other files
export default Inventory_Details_Modal;
