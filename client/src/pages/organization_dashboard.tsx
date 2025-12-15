// src/pages/organization_dashboard.tsx (Update the import path)

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
import QuickActions from "../components/ui/button_quick_actions";
import StatisticsCard from "../components/ui/card_organization_statistics";
import Header from "../components/ui/navbar_organization";

const DashboardPage = () => {
  return (
    <>
      <div className="dashboard-container">
        {/* 1. Navigation Bar */}
        <Header />

        {/* 2. Main content wrapper */}
        <main className="dashboard-content">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          <h1>Welcome to the Dashboard!</h1>{" "}
          {/* NEW SECTION: Statistics Cards */}
          <div className="stats-grid">
            {" "}
            {/* This class will control the layout of the 5 cards */}
            <StatisticsCard
              title="Total Inventory"
              value={30}
              delta="+3 this week"
              status="up"
            />
            <StatisticsCard
              title="Total Borrowed"
              value={50}
              delta="+3 this week"
              status="up"
            />
            <StatisticsCard
              title="Total Returned"
              value={40}
              delta="+3 this week"
              status="up"
            />
            <StatisticsCard
              title="Expiring Inventory"
              value={2}
              delta="-10 this week"
              status="down"
            />
            <StatisticsCard
              title="Inventory Due"
              value={2}
              delta="-10 this week"
              status="down"
            />
          </div>
          {/* NEW: Two-Column Layout for Activity and Actions */}
          <div className="dashboard-content-layout">
            {/* 1. LEFT COLUMN: Recent Activity */}
            <section className="activity-panel">
              {/* This is where the RecentActivity component will go */}
              <h2>Recent Activity</h2>
              {/* Temporary placeholder to see the layout */}
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                }}
              >
                Activity List Placeholder
              </div>
            </section>

            {/* 2. RIGHT COLUMN: Quick Actions */}
            <aside className="actions-panel">
              <QuickActions />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default DashboardPage;
