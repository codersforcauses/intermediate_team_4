// src/pages/organization_dashboard.tsx (Update the import path)

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
import QuickActions from "../components/ui/button_quick_actions";
import RecentActivityPanel from "../components/ui/card_organization_recent_activities_panel";
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
          {/* Statistics Cards */}
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

// export to make the function available to other parts of the app
export default DashboardPage;
