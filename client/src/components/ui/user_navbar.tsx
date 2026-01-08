// src/pages/user_dashboard.tsx (Update the import path)
//import "";

import Link from "next/link";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import UserFriendsRecieved from "../ui/popups/user_friends_recieved_popup";
import UserFriendsSent from "../ui/popups/user_friends_sent_popup";

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"recieved" | "sent" | null>(
    null,
  );

  // modal logic
  // const handleOpen = () => {
  //   setIsModalOpen(true);
  // };
  // const handleClose = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      {/* 1. Navigation Bar */}
      {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"></div> */}
      <div className="border-4 border-solid bg-white">
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          {/* Logo and Navigation Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logo
            <Link href="/user_dashboard">
              <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
                My Dashboard
              </button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full min-w-[200px] max-w-sm">
            <div className="relative">
              <input
                className="ease w-full rounded-md border border-slate-200 bg-transparent py-2 pl-3 pr-28 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                placeholder="Eg., Ky Kiske"
              />
              <button
                className="absolute right-1 top-1 flex items-center rounded border border-transparent bg-slate-800 px-2.5 py-1 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Login and Cart Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
            <Link href="/user_friends">
              <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
                My Friends
              </button>
            </Link>
            <Link href="/user_groups">
              <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
                My Groups
              </button>
            </Link>
            <Link href="/user_inventory">
              <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
                My Inventory
              </button>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="group relative">
                  <Link href="/user_page">
                    <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
                      Hello, {user.username}
                    </button>
                  </Link>
                  {/* Dropdown */}
                  <div className="pointer-events-auto absolute left-0 top-full hidden w-56 rounded bg-white shadow-lg group-hover:block">
                    <button
                      className="rounded px-4 py-2 hover:bg-blue-100"
                      onClick={() => {
                        setActiveModal("recieved");
                        setIsModalOpen(true);
                      }}
                    >
                      Friend Requests Recieved
                    </button>
                    <button
                      className="rounded px-4 py-2 hover:bg-blue-100"
                      onClick={() => {
                        setActiveModal("sent");
                        setIsModalOpen(true);
                      }}
                    >
                      Friend Requests Sent
                    </button>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="rounded bg-red-200 px-4 py-2 hover:bg-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link href="/user_login">
                  <button
                    onClick={logout}
                    className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300"
                  >
                    Login
                  </button>
                  {/* <a href="/user_login">Login</a> */}
                </Link>
              </div>
            )}
          </div>
          {activeModal === "recieved" && (
            <UserFriendsRecieved
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
          {activeModal === "sent" && (
            <UserFriendsSent
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default UserNavbar;
