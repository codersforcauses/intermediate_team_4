import Head from "next/head";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <div className="user-container">
        <main className="user-content">
          <h1>Welcome to the Users Page!</h1>{" "}
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
