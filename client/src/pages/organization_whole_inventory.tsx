import React from "react";

import { Inventory_Details_Interface } from "@/components/ui/card_organization_inventory_details_modal";
import Header from "@/components/ui/navbar_organization";

import { useOrganizationBackendGetItems } from "../hooks/organization_clean_backend_calls";

const Organization_Whole_Inventory = () => {
  // 1. Fetch the data using your custom hook
  const { data, loading, error } = useOrganizationBackendGetItems("all");

  // 2. Handle the "Wait" states
  if (loading)
    return <div className="mt-10 text-center">Loading inventory...</div>;
  if (error)
    return (
      <div className="mt-10 text-center text-red-500">Error loading data.</div>
    );

  return (
    <main>
      <Header />
      <div className="inventory-page">
        <h1 className="inventory-title">All Inventory</h1>

        <div className="inventory-grid">
          {/* 3. Loop through your data and create a card for each item, the code tells the compiler to read it as js so it 
            does a condition check to make sure the data is not null then map all the items */}
          {data &&
            data.map((item: Inventory_Details_Interface) => (
              <div key={item.id} className="inventory-card">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-detail">{item.details}</p>
                <span className="mt-4 text-xs font-semibold uppercase text-gray-400">
                  {item.details || "General"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Organization_Whole_Inventory;
