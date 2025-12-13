// src/pages/organization_dashboard.tsx (Update the import path)

import Head from "next/head";
// The Header component is now one directory level up from 'pages',
// so the path is '../components/Header'
//import Header from '../components/Header';

const UserDashboardPage = () => {
  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <div className="dashboard-container">
        {/* 1. Navigation Bar */}
        {/* <Header /> */}

        {/* 2. Main content wrapper */}
        <main className="dashboard-content">
          {/* Components for Statistics, Recent Activity, and Quick Actions */}
          <h1>Welcome to the User Dashboard!</h1>{" "}
          {/* Add a temporary header to confirm it works */}
        </main>
      </div>
    </>
  );
};

// export to make the function available to other parts of the app
export default UserDashboardPage;
