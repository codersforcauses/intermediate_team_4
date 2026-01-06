// src/pages/user_dashboard.tsx (Update the import path)
//import "";

import Head from "next/head";

import UserNavbar from "../components/ui/user_navbar";
// import {useState, useEffect} from "react";
import UserGroupsTable from "../components/ui/user_tables/user_groups_table";

// type MyGroups = {
//   id: number;
//   name: string;
// }

{
  /* optional: later have a list for friends in said groups or something in above "my groups" */
}

// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
//import Header from '../components/Header';

const UserGroupsPage = () => {
  return (
    <>
      <Head>
        <title>My Groups</title>
      </Head>
      {/* Page background */}
      <UserNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* 2. Main content wrapper */}
        <main className="mx-auto h-[80vh] max-w-6xl">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          <h1 className="mb-6 text-3xl font-bold">My Groups</h1>

          {/* Inventory Grid */}
          <div className="grid h-full grid-flow-col grid-rows-1 gap-4">
            <div className="row-span-4 flex flex-col rounded-xl bg-white p-4 shadow">
              <h2 className="mb-2 text-xl font-semibold">My Groups</h2>
              <UserGroupsTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default UserGroupsPage;
