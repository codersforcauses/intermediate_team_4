// src/pages/organization_activity.tsx

import Head from "next/head";
import { useState } from "react";

import {
  organization_clean_backend_calls_return_interface,
  useOrganizationBackendGetItems,
} from "@/components/ui/backend/organization_clean_backend_calls";
import QuickActions from "@/components/ui/button_quick_actions";
import Inventory_Details_Modal, {
  Inventory_Details_Interface,
} from "@/components/ui/card_organization_inventory_details_modal";
import Inventory_Status_Card from "@/components/ui/card_organization_inventory_status_card";
import Recent_Activity_Panel from "@/components/ui/card_organization_recent_activities_panel";

import NavbarOrganization from "../components/ui/navbar_organization";

// destructuring with colons will rename the variables
const Organization_Activity_Page = () => {
  // for the recent activity panel
  const {
    // renmaes data -> allData
    data: allData,
    loading: allLoading,
    error: allError,
    refresh: allRefresh,
  }: organization_clean_backend_calls_return_interface = useOrganizationBackendGetItems(
    "",
    "",
  );

  console.log("Data from useOrganizationBackendGetItems:", allData);
  console.log("Loading state:", allLoading);
  console.log("Error state:", allError);
  console.log("Refresh function:", allRefresh);

  //  for the statistic cards //
  const {
    data: expiringData,
    loading: expiringLoading,
    error: expiringError,
    refresh: expiringRefresh,
  }: organization_clean_backend_calls_return_interface = useOrganizationBackendGetItems(
    "",
    "expiryDate",
  );

  console.log("Data from useOrganizationBackendGetItems:", expiringData);
  console.log("Loading state:", expiringLoading);
  console.log("Error state:", expiringError);
  console.log("Refresh function:", expiringRefresh);

  const {
    data: dueData,
    loading: dueLoading,
    error: dueError,
    refresh: dueRefresh,
  }: organization_clean_backend_calls_return_interface = useOrganizationBackendGetItems(
    "",
    "dueOn",
  );

  console.log("Data from useOrganizationBackendGetItems:", dueData);
  console.log("Loading state:", dueLoading);
  console.log("Error state:", dueError);
  console.log("Refresh function:", dueRefresh);

  const {
    data: borrowedData,
    loading: borrowedLoading,
    error: borrowedError,
    refresh: borrowedRefresh,
  }: organization_clean_backend_calls_return_interface = useOrganizationBackendGetItems(
    "",
    "borrowedOn",
  );

  console.log("Data from useOrganizationBackendGetItems:", borrowedData);
  console.log("Loading state:", borrowedLoading);
  console.log("Error state:", borrowedError);
  console.log("Refresh function:", borrowedRefresh);

  const {
    data: returnedData,
    loading: returnedLoading,
    error: returnedError,
    refresh: returnedRefresh,
  }: organization_clean_backend_calls_return_interface = useOrganizationBackendGetItems(
    "",
    "returnedOn",
  );

  console.log("Data from useOrganizationBackendGetItems:", returnedData);
  console.log("Loading state:", returnedLoading);
  console.log("Error state:", returnedError);
  console.log("Refresh function:", returnedRefresh);

  // end of statistic cards //

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
      <Head>
        <title>Activity Log - Full View</title>
      </Head>

      <div className="dashboard-container">
        <NavbarOrganization />

        {/* 2. @See card_organization_inventory_status_data to understand how it works */}
        <main className="activity-page-main">
          {/* NEW SECTION: Inventory Status Cards (Summary/Filters) */}
          <div className="inv-cards-grid">
            <Inventory_Status_Card
              title="Expiring Inventory"
              viewAllHref="/organization_whole_inventory"
              data={expiringData}
              onItemClick={handleItemClick}
            />
            <Inventory_Status_Card
              title="Inventory Due"
              viewAllHref="/organization_whole_inventory"
              data={dueData}
              onItemClick={handleItemClick}
            />
            <Inventory_Status_Card
              title="Borrowed Items"
              viewAllHref="/organization_whole_inventory"
              data={borrowedData}
              onItemClick={handleItemClick}
            />
            <Inventory_Status_Card
              title="Returned Items"
              viewAllHref="/organization_whole_inventory"
              data={returnedData}
              onItemClick={handleItemClick}
            />
          </div>

          {/* Two-Column Layout for Activity and Actions */}
          <div className="dashboard-content-layout">
            {/* LEFT COLUMN: Recent Activity, used section here to group some assets */}
            <section className="activity-panel">
              <Recent_Activity_Panel
                onItemClick={handleItemClick}
                data={allData}
              />
            </section>

            {/* 2. RIGHT COLUMN: Quick Actions, aside here is used for accessibility, it does not make it appear on the right*/}
            <aside className="actions-panel">
              <QuickActions />
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

export default Organization_Activity_Page;

/*
            1. TOP SECTION: Filters and Search 
            <div className="activity-controls">
                Temporary Filter/Search Placeholders 
                <input type="text" placeholder="Search by item or member..." className="activity-search-input" />
                <select className="activity-filter-select">
                    <option value="all">Filter by Type: All</option>
                    <option value="inventory">Inventory Changes</option>
                    <option value="member">Member Changes</option>
                </select>
                <button className="activity-filter-button">Apply Filters</button>
            </div>

             2. MAIN SECTION: Activity List 
            <div className="activity-full-list-card">
              <div className="activity-full-list">
                {
                  mockFullActivityData.map((item, index) => (
                    // Reusing the modular component
                    <RecentActivityItem
                      key={index} 
                      status={item.status}
                      title={item.title}
                      detail={item.detail}
                      quantity={item.quantity}
                      time={item.time}
                      type={'member'} // Simplified for now
                    />
                  ))
                }
              </div>
            </div>


              3. BOTTOM SECTION: Pagination
            <div className="activity-pagination">
              
                <span>Page 1 of 10</span>
                <button>&lt; Previous</button>
                <button>Next &gt;</button>
            </div>
*/
