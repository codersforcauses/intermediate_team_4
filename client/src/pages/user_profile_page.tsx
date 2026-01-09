import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import User_Navbar from "../components/ui/user_navbar";
import { useAuth } from "../context/AuthContext";
import { getFriends } from "../lib/api/friends";
import { Friend } from "../types/friends";

export default function UserPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(res.data.friends);
    });
  }, []);
  return (
    <>
      <Head>
        <title>User Profile Page</title>
      </Head>

      {/* Navbar refactor */}
      <User_Navbar />

      <div
        style={{
          backgroundColor: "#e6e6e6",
          minHeight: "100vh",
          paddingTop: "64px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Profile card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "900px",
            height: "500px",
            borderRadius: "8px",
            padding: "48px",
            textAlign: "center",
            marginTop: "40px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#5b84b1",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              margin: "-100px auto 16px",
            }}
          >
            U
          </div>

          {/* User details */}
          <h2 style={{ marginTop: "25px", fontSize: "28px" }}>
            {user?.username}

            {/* Should instead be an api call for friends name of curent user profile viewed, 
              not necessarily the current logged in user, update later in backend and frontend, 
              (could update existing views with permissions of auth allowing interactivity ?? ) */}
          </h2>
          <p style={{ color: "#666", marginBottom: "40px", fontSize: "18px" }}>
            Perth, Western Australia
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "40px 40px",
            }}
          >
            <Stat label="Borrowed" value={0} />
            <Link href="./user_friends">
              <Stat label="Friends" value={friends.length} />
            </Link>

            {/* Should instead be an api call for friends number of curent user profile viewed, 
            not necessarily the current logged in user, update later in backend and frontend, 
            and link should also point to specific page for friends of user being viewed 
            (could update existing views with permissions of auth allowing interactivity ?? ) */}

            <Stat label="Mutual friends" value={0} />
            <Stat label="Clubs joined" value={0} />
          </div>
          {/* { user === profile_user (

            ) : (
              <Stat label="Mutual friends" value={0} />
            )
            } */}
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div style={{ fontSize: "45px", marginBottom: "8px" }}>{value}</div>
      <div style={{ color: "#666", fontSize: "18px" }}>{label}</div>
    </div>
  );
}
