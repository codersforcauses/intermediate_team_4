// src/pages/organization_activity.tsx

import Head from "next/head";

import QuickActions from "@/components/ui/button_quick_actions";
import InventoryStatusCard from "@/components/ui/card_organization_inventory_status_card";
import RecentActivityPanel from "@/components/ui/card_organization_recent_activities_panel";

import NavbarOrganization from "../components/ui/navbar_organization";

// --- MOCK DATA FOR THE SUMMARY CARDS ---
const mockInventoryItems = [
  { itemName: "Cool Potato", statusDetail: "In 2 days" },
  { itemName: "Cool Potato", statusDetail: "In 2 days" },
  { itemName: "Cool Potato", statusDetail: "In 2 days" },
];

const mockBorrowedItems = [
  { itemName: "Cool Potato", statusDetail: "5 mins ago" },
  { itemName: "Cool Potato", statusDetail: "5 mins ago" },
  { itemName: "Cool Potato", statusDetail: "5 mins ago" },
];

const ActivityPage = () => {
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
            <InventoryStatusCard
              title="Expiring Inventory"
              viewAllHref="/inventory/expiring"
              items={mockInventoryItems}
            />
            <InventoryStatusCard
              title="Inventory Due"
              viewAllHref="/inventory/due"
              items={mockInventoryItems}
            />
            <InventoryStatusCard
              title="Borrowed Items"
              viewAllHref="/inventory/borrowed"
              items={mockBorrowedItems}
            />
            <InventoryStatusCard
              title="Returned Items"
              viewAllHref="/inventory/returned"
              items={mockBorrowedItems}
            />
          </div>

          {/* Two-Column Layout for Activity and Actions */}
          <div className="dashboard-content-layout">
            {/* LEFT COLUMN: Recent Activity, used section here to group some assets */}
            <section className="activity-panel">
              <RecentActivityPanel />
            </section>

            {/* 2. RIGHT COLUMN: Quick Actions, aside here is used for accessibility, it does not make it appear on the right*/}
            <aside className="actions-panel">
              <QuickActions />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default ActivityPage;

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
