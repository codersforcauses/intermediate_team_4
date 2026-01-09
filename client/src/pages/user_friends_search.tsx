import Head from "next/head";

import UserNavbar from "../components/ui/user_navbar";
import UserFriendSearchTable from "../components/ui/user_tables/user_friends_search_table";

const UserSearchPage = () => {
  return (
    <>
      <Head>
        <title>My Inventory</title>
      </Head>
      {/* Navbar */}
      <UserNavbar />
      {/* Page background */}
      <div className="min-h-screen bg-gray-100 p-6">
        {/* 2. Main content wrapper */}
        <main className="mx-auto h-[80vh] max-w-6xl">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          {/* <h1 className="mb-6 text-3xl font-bold">Search for Friends</h1> */}

          {/* Friend Grid */}
          <div className="grid h-full grid-flow-col grid-rows-1 gap-4">
            <div className="row-span-4 flex flex-col rounded-xl bg-white p-4 shadow">
              <UserFriendSearchTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default UserSearchPage;
