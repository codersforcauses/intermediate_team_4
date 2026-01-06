// src/pages/user_dashboard.tsx (Update the import path)
//import "";

import Head from "next/head";
import Link from "next/link";

import UserNavbar from "../components/ui/user_navbar";
import UserFriendsTable from "../components/ui/user_tables/user_friends_table";
import UserGroupsTable from "../components/ui/user_tables/user_groups_table";
import UserInventoryTable from "../components/ui/user_tables/user_inventory_table";

{
  /* optional: later have a list for friends in said groups or something in above "my groups" */
}

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
//import Header from '../components/Header';

const UserDashboardPage = () => {
  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      {/* 1. Navigation Bar */}
      <UserNavbar />

      {/* Page background */}
      <div className="min-h-screen bg-gray-100 p-6">
        {/* 2. Main content wrapper */}
        <main className="mx-auto h-[80vh] max-w-6xl">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          <h1 className="mb-6 text-3xl font-bold">
            Welcome to the User Dashboard!
          </h1>

          {/* Dashboard Grid */}
          <div className="grid h-full grid-flow-col grid-rows-3 gap-4">
            {/* Inventory Panel (Scrollable) */}
            <div className="row-span-3 flex flex-col rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="mb-2 text-xl font-semibold">My Inventory</h2>
                {/* route to inventory page  TODO:*/}
                <Link href="/user_inventory">
                  <button className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
                    View My Inventory
                  </button>
                </Link>
              </div>
              <UserInventoryTable />
            </div>

            {/* Top right panel */}
            <div className="col-span-2 flex flex-col rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="mb-2 text-xl font-semibold">Due Soon</h2>
                {/* route to inventory page TODO: (or just regular inventory page ig) */}
                <Link href="/user_inventory">
                  <button className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
                    View My Inventory Due Soon
                  </button>
                </Link>
              </div>
              <UserInventoryTable />
            </div>

            {/* Middle right panel */}
            <div className="col-span-2 row-span-1 flex flex-col rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="mb-2 text-xl font-semibold">My Groups</h2>
                {/* route to groups page  TODO:*/}
                <Link href="/user_groups">
                  <button className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
                    View My Groups
                  </button>
                </Link>
              </div>
              <UserGroupsTable />
            </div>

            {/* Bottom right panel */}
            <div className="col-span-2 row-span-1 flex flex-col rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="mb-2 text-xl font-semibold">My Friends</h2>
                {/* route to groups page  TODO:*/}
                <Link href="/user_friends">
                  <button className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
                    View My Friends
                  </button>
                </Link>
              </div>
              <UserFriendsTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default UserDashboardPage;
