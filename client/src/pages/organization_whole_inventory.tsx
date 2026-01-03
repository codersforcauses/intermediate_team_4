import React, { useState } from "react";

import Inventory_Details_Modal, {
  Inventory_Details_Interface,
} from "@/components/ui/card_organization_inventory_details_modal";
import Card_Organization_Whole_Inventroy from "@/components/ui/card_organization_whole_inventory";
import Header from "@/components/ui/navbar_organization";

import { useOrganizationBackendGetItems } from "../hooks/organization_clean_backend_calls";

const Organization_Whole_Inventory = () => {
  // 1. Fetch the data using your custom hook
  const { data, loading, error, refresh } =
    useOrganizationBackendGetItems("all");
  console.log("Refresh function:", refresh);

  // for the overlay model state management
  // This is for the overlay modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] =
    useState<Inventory_Details_Interface | null>(null);

  /* 
  This is for the item click, the function is mentioned here and passed down to the modal
  */
  const handleItemClick = (data: Inventory_Details_Interface) => {
    console.log("Item clicked: ", data);

    // setSelectedItemData(generateRandomMockInventoryDetails());
    setSelectedItemData(data);

    // to open the modal
    setIsModalOpen(true);

    // PENDING, remove after figuring out how to pass the correct data
    console.log("Selected Item Data:", selectedItemData);
  };

  // 2. Handle the "Wait" states
  if (loading)
    return <div className="mt-10 text-center">Loading inventory...</div>;
  if (error)
    return (
      <div className="mt-10 text-center text-red-500">Error loading data.</div>
    );

  return (
    <>
      <main>
        <Header />
        <div className="inventory-page">
          <h1 className="inventory-title">All Inventory</h1>

          <div className="inventory-grid">
            {/* 3. Loop through your data and create a card for each item, the code tells the compiler to read it as js so it 
            does a condition check to make sure the data is not null then map all the items */}
            {data &&
              data.map((item, index) => (
                <Card_Organization_Whole_Inventroy
                  key={index}
                  onItemClick={handleItemClick}
                  itemData={item}
                />
              ))}
          </div>
        </div>
      </main>
      {/* RENDER THE MODAL HERE, Remember to send the data of the item here as well*/}
      <Inventory_Details_Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemData={selectedItemData}
      />
    </>
  );
};

export default Organization_Whole_Inventory;
