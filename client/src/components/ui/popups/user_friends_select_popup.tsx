// src/components/popups/user_groups_select_popup.tsx

import Link from "next/link";
import React from "react";

import { removeFriend } from "../../../lib/api/friends";
import ProfilePicture from "../profile_picture";

type MyFriends = {
  id: number;
  // name: string;
  username: string;
};

type ItemModalProps = {
  isOpen: boolean;
  item: MyFriends | null;
  onClose: () => void;
  onFriendRemoved: (id: number) => void;
};

function UserFriendsSelectPopup({
  isOpen,
  item,
  onClose,
  onFriendRemoved,
}: ItemModalProps) {
  if (!item) return;
  const handleRemoveFriend = async () => {
    try {
      await removeFriend(item.id);
      onFriendRemoved(item.id);
      onClose();
    } catch (err) {
      console.error("Failed to remove friend", err);
    }
  };
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex gap-4 pb-4">
          {/* Header */}
          {/* Avatar */}
          <ProfilePicture />
          {/* Implement below when we implement a profile picture field */}

          {/* {profile_picture === Null ? ( 
            <ProfilePicture/>
          ) : (
            item.profile_picture
           )}
          } */}

          {/* Text column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Name */}
            <Link href="/user_friends">
              <h2 className="cursor-pointer truncate pl-5 pt-3 text-2xl font-bold hover:text-gray-900 hover:underline">
                {item.username}
              </h2>
            </Link>
            {/* other */}
            <div className="mt-1 grid grid-cols-2 pl-5 pt-1">
              <p className="truncate text-gray-500"> User: {item.id}</p>
              <Link href="/user_groups">
                <p className="cursor-pointer truncate text-gray-500 hover:text-gray-800 hover:underline">
                  {" "}
                  Mutual Groups: {item.id}
                </p>
              </Link>
            </div>
          </div>
          <button
            onClick={onClose}
            className="-translate-y-10 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Link href="/user_friends">
            <button className="rounded bg-blue-200 px-4 py-2 hover:bg-blue-300">
              <div className="flex items-center justify-between">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 rounded-full text-blue-500"
                >
                  <path d="M2 3h20v14H6l-4 4V3z" />
                </svg>{" "}
                &nbsp; Message
              </div>
            </button>
          </Link>
          <button
            onClick={handleRemoveFriend}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            <div className="flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-log-out-icon lucide-log-out"
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
              &nbsp; Remove {/* Backend remove action */}
            </div>
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            X Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserFriendsSelectPopup;
