// src/pages/organization_dashboard.tsx

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
import { useState } from "react";

import Inventory_Details_Modal, {
  Inventory_Details_Interface,
} from "@/components/ui/card_organization_inventory_details_modal";
import {
  organization_clean_backend_calls_return_interface,
  useOrganizationCallBackendCalls,
} from "@/hooks/organization_clean_backend_calls";

import Quick_Actions from "../components/ui/button_quick_actions";
import Recent_Activity_Panel from "../components/ui/card_organization_recent_activities_panel";
import Statistics_Card from "../components/ui/card_organization_statistics";
import Header from "../components/ui/navbar_organization";

const Organization_Dashboard = () => {
  // this is for calling the data for the modal
  const {
    data,
    loading,
    error,
    refresh,
  }: organization_clean_backend_calls_return_interface =
    useOrganizationCallBackendCalls("all");
  console.log("Data from useOrganizationCallBackendCalls:", data);
  console.log("Loading state:", loading);
  console.log("Error state:", error);
  console.log("Refresh function:", refresh);

  // This is for the overlay modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] =
    useState<Inventory_Details_Interface | null>(null);

  /* 
  We will need to have a function here as well to handle the getting of the data
  the onCLick handler is at this level because the modal is here
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

  return (
    <>
      <div className="dashboard-container">
        {/* 1. Navigation Bar */}
        <Header />

        {/* 2. Main content wrapper */}
        {/* <p>{JSON.stringify(data)}</p> */}
        <main className="dashboard-content">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          {/* Statistics Cards */}
          <div className="stats-grid">
            {" "}
            {/* This class will control the layout of the 5 cards */}
            <Statistics_Card
              title="Total Inventory"
              value={30}
              delta="+3 this week"
              status="up"
            />
            <Statistics_Card
              title="Total Borrowed"
              value={50}
              delta="+3 this week"
              status="up"
            />
            <Statistics_Card
              title="Total Returned"
              value={40}
              delta="+3 this week"
              status="up"
            />
            <Statistics_Card
              title="Expiring Inventory"
              value={2}
              delta="-10 this week"
              status="down"
            />
            <Statistics_Card
              title="Inventory Due"
              value={2}
              delta="-10 this week"
              status="down"
            />
          </div>

          {/* Two-Column Layout for Activity and Actions */}
          <div className="dashboard-content-layout">
            {/* LEFT COLUMN: Recent Activity, used section here to group some assets */}
            <section className="activity-panel">
              <Recent_Activity_Panel
                onItemClick={handleItemClick}
                data={data}
              />
            </section>

            {/* 2. RIGHT COLUMN: Quick Actions, aside here is used for accessibility, it does not make it appear on the right*/}
            <aside className="actions-panel">
              <Quick_Actions />
            </aside>
          </div>
        </main>
      </div>
      {/* RENDER THE MODAL HERE, Remember to send the data of the item here as well*/}
      <Inventory_Details_Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemData={selectedItemData}
      />
    </>
  );
};

// export to make the function available to other parts of the app
export default Organization_Dashboard;
