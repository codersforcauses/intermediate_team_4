// src/pages/user_dashboard.tsx (Update the import path)
//import "";

import Head from "next/head";
import { useState } from "react";

// import {useState, useEffect} from "react";
import UserFriendsSearchPopup from "../components/ui/popups/user_friends_search_popup";
import UserNavbar from "../components/ui/user_navbar";
import UserFriendsTable from "../components/ui/user_tables/user_friends_table";

const UserFriendsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>My Friends</title>
      </Head>
      {/* Navbar */}
      <UserNavbar />
      {/* Page background */}
      <div className="min-h-screen bg-gray-100 p-6">
        {/* 2. Main content wrapper */}
        <main className="mx-auto h-[80vh] max-w-6xl">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          <h1 className="mb-6 text-3xl font-bold">My Friends</h1>

          {/* Inventory Grid */}
          <div className="grid h-full grid-flow-col grid-rows-1 gap-4">
            <div className="row-span-4 flex flex-col rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="mb-2 text-xl font-semibold">My Friends</h2>

                <button
                  className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  + Friends{" "}
                </button>
              </div>
              <UserFriendsTable />
            </div>
          </div>
        </main>
        <UserFriendsSearchPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default UserFriendsPage;
