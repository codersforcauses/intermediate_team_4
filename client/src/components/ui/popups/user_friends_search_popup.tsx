// src/components/popups/user_groups_add_popup.tsx

import Link from "next/link";
import React from "react";

type ItemModalProps = {
  // user={selectedItem;
  isOpen: boolean;
  onClose: () => void;
};

function UserFriendsSearchPopup({ isOpen, onClose }: ItemModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Add Friends</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="space-y-2 py-4">
          {/* Start */}
          <div className="w-full min-w-[200px] max-w-sm">
            <div className="relative">
              <input
                className="ease w-full rounded-md border border-slate-200 bg-transparent py-2 pl-3 pr-28 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                placeholder="Eg., Ky Kiske"
              />
              <button
                type="button"
                className="absolute right-1 top-1 flex items-center rounded border border-transparent bg-slate-800 px-2.5 py-1 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
          {/* End */}
          {/* <p><strong>ID:</strong> Ummm ~~ </p> */}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Link href="../../../user_friends_search/">
            <button className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
              Expand
            </button>
          </Link>
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Close
          </button>
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserFriendsSearchPopup;
