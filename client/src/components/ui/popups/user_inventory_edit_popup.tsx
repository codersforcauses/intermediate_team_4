// src/components/popups/user_groups_select_popup.tsx

import Link from "next/link";
import React from "react";

type InventoryItem = {
  id: number;
  name: string;
  date: string;
  dateNew: Date;
};

type ItemModalProps = {
  isOpen: boolean;
  item: InventoryItem | null;
  onClose: () => void;
};

function UserInventoryEditPopup({ isOpen, item, onClose }: ItemModalProps) {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative flex justify-between">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-500">
              <div className="absolute top-5 h-12 w-12 rounded-full bg-blue-200"></div>
              <div className="absolute -bottom-2 left-1/2 h-12 w-16 -translate-x-1/2 rounded-full bg-blue-200"></div>
            </div>
          </div>
          {/* Text column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Name */}
            <h2 className="cursor-pointer truncate pl-8 pt-3 text-2xl font-bold hover:text-gray-900 hover:underline">
              {item.name}
            </h2>
            {/* other */}
            <div className="mt-1 grid grid-cols-2 gap-4 pl-6 pt-1">
              <p className="truncate text-gray-500"> Category: {item.id}</p>
              <p className="cursor-pointer truncate text-gray-500 hover:text-gray-800 hover:underline">
                {" "}
                Owned by: {item.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="-translate-y-10 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        {/* Body */}
        {/* Date Change */}
        <div className="space-y-2 py-4">
          <p>
            <strong>Extend/Reduce Return Date:</strong>
          </p>{" "}
          <input
            type="date"
            className="form-input rounded-md border border-gray-300 pl-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="expiryDate"
            // value={item.dateNew.toDateString()}
            defaultValue={item.dateNew.toISOString().split("T")[0]}
            // onChange={handleChange}
          />
          {/* Description */}
          <div className="mt-4 pt-3">
            <label
              htmlFor="notes"
              className="text-medium block pb-3 font-bold text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Add notes (e.g. book damaged on spine)…"
              rows={3}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              maxLength={300}
            />
            <p className="text-right text-xs text-gray-400">
              Max 300 characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Link href="/user_inventory">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={onClose}
            >
              Send Request
            </button>
          </Link>
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
export default UserInventoryEditPopup;
