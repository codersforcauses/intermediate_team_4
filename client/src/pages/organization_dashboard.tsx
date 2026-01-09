// src/pages/organization_dashboard.tsx

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
import { useState } from "react";

import { WEEKLY_REPORT_BY_FIELD } from "@/components/ui/backend/organization_call_backend";
import {
  organization_clean_backend_calls_return_count_interface,
  organization_clean_backend_calls_return_interface,
  useOrganizationBackendGetItems,
  useOrganizationBackendGetWeeklyReportByField,
} from "@/components/ui/backend/organization_clean_backend_calls";
import Inventory_Details_Modal, {
  Inventory_Details_Interface,
} from "@/components/ui/card_organization_inventory_details_modal";

import Quick_Actions from "../components/ui/button_quick_actions";
import Recent_Activity_Panel from "../components/ui/card_organization_recent_activities_panel";
import Statistics_Card from "../components/ui/card_organization_statistics";
import Header from "../components/ui/navbar_organization";

const Organization_Dashboard = () => {
  // calling backend starts //
  // this is for calling the data for the modal
  const {
    data,
    loading,
    error,
    refresh,
  }: organization_clean_backend_calls_return_interface =
    useOrganizationBackendGetItems("", "");
  console.log("Data from useOrganizationBackendGetItems:", data);
  console.log("Loading state:", loading);
  console.log("Error state:", error);
  console.log("Refresh function:", refresh);

  const {
    thisWeek: countItemsDueThisWeek,
    lastWeek: countItemsDueLastWeek,
    difference: countItemsDueDifference,
    loading: countItemsDueLoading,
    error: countItemsDueError,
    refresh: countItemsDueRefresh,
  }: organization_clean_backend_calls_return_count_interface = useOrganizationBackendGetWeeklyReportByField(
    `${WEEKLY_REPORT_BY_FIELD}?field=dueOn`,
  );

  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDueThisWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDueLastWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDueDifference,
  );
  console.log("Loading state:", countItemsDueLoading);
  console.log("Error state:", countItemsDueError);
  console.log("Refresh function:", countItemsDueRefresh);

  const {
    thisWeek: countItemsExpiringThisWeek,
    lastWeek: countItemsExpiringLastWeek,
    difference: countItemsExpiringDifference,
    loading: countItemsExpiringLoading,
    error: countItemsExpiringError,
    refresh: countItemsExpiringRefresh,
  }: organization_clean_backend_calls_return_count_interface = useOrganizationBackendGetWeeklyReportByField(
    `${WEEKLY_REPORT_BY_FIELD}?field=expiryDate`,
  );

  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsExpiringThisWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsExpiringLastWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsExpiringDifference,
  );
  console.log("Loading state:", countItemsExpiringLoading);
  console.log("Error state:", countItemsExpiringError);
  console.log("Refresh function:", countItemsExpiringRefresh);

  const {
    thisWeek: countItemsBorrowedThisWeek,
    lastWeek: countItemsBorrowedLastWeek,
    difference: countItemsBorrowedDifference,
    loading: countItemsBorrowedLoading,
    error: countItemsBorrowedError,
    refresh: countItemsBorrowedRefresh,
  }: organization_clean_backend_calls_return_count_interface = useOrganizationBackendGetWeeklyReportByField(
    `${WEEKLY_REPORT_BY_FIELD}?field=borrowedOn`,
  );

  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsBorrowedThisWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsBorrowedLastWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsBorrowedDifference,
  );
  console.log("Loading state:", countItemsBorrowedLoading);
  console.log("Error state:", countItemsBorrowedError);
  console.log("Refresh function:", countItemsBorrowedRefresh);

  const {
    thisWeek: countItemsReturnedThisWeek,
    lastWeek: countItemsReturnedLastWeek,
    difference: countItemsReturnedDifference,
    loading: countItemsReturnedLoading,
    error: countItemsReturnedError,
    refresh: countItemsReturnedRefresh,
  }: organization_clean_backend_calls_return_count_interface = useOrganizationBackendGetWeeklyReportByField(
    `${WEEKLY_REPORT_BY_FIELD}?field=returnedOn`,
  );

  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsReturnedThisWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsReturnedLastWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsReturnedDifference,
  );
  console.log("Loading state:", countItemsReturnedLoading);
  console.log("Error state:", countItemsReturnedError);
  console.log("Refresh function:", countItemsReturnedRefresh);

  const {
    thisWeek: countItemsDateAddedThisWeek,
    lastWeek: countItemsDateAddedLastWeek,
    difference: countItemsDateAddedDifference,
    loading: countItemsDateAddedLoading,
    error: countItemsDateAddedError,
    refresh: countItemsDateAddedRefresh,
  }: organization_clean_backend_calls_return_count_interface = useOrganizationBackendGetWeeklyReportByField(
    `${WEEKLY_REPORT_BY_FIELD}?field=dateAdded`,
  );

  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDateAddedThisWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDateAddedLastWeek,
  );
  console.log(
    "Data from useOrganizationBackendGetItems:",
    countItemsDateAddedDifference,
  );
  console.log("Loading state:", countItemsDateAddedLoading);
  console.log("Error state:", countItemsDateAddedError);
  console.log("Refresh function:", countItemsDateAddedRefresh);

  // calling backend ends //

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
              value={countItemsDateAddedThisWeek}
              delta={`${countItemsDateAddedDifference} this week`}
              status="up"
            />
            <Statistics_Card
              title="Total Borrowed"
              value={countItemsBorrowedThisWeek}
              delta={`${countItemsBorrowedDifference} this week`}
              status="up"
            />
            <Statistics_Card
              title="Total Returned"
              value={countItemsReturnedThisWeek}
              delta={`${countItemsReturnedDifference} this week`}
              status="up"
            />
            <Statistics_Card
              title="Expiring Inventory"
              value={countItemsExpiringThisWeek}
              delta={`${countItemsExpiringDifference} this week`}
              status="down"
            />
            <Statistics_Card
              title="Inventory Due"
              value={countItemsDueThisWeek}
              delta={`${countItemsDueDifference} this week`}
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
