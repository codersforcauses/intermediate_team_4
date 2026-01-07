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
  onEdit: (item: InventoryItem) => void;
};

function UserInventorySelectPopup({
  isOpen,
  item,
  onClose,
  onEdit,
}: ItemModalProps) {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* onClick={onClose} */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-500">
            <div className="absolute top-5 h-12 w-12 rounded-full bg-blue-200"></div>
            <div className="absolute -bottom-2 left-1/2 h-12 w-16 -translate-x-1/2 rounded-full bg-blue-200"></div>
          </div>
          {/* Body */}
          <div className="space-y-2 py-4">
            <Link href="/user_inventory">
              <h2 className="cursor-pointer text-2xl font-bold hover:text-gray-900 hover:underline">
                {item.name}
              </h2>
            </Link>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-gray-500">Item ID: {item.id} </p> &nbsp; &nbsp;{" "}
              {/* Unique Profile Identifier */}
              <p className="cursor-pointer text-gray-500 hover:text-gray-900 hover:underline">
                Owned By: {item.id}
              </p>{" "}
              {/* Add link/popup here? */}
            </div>
          </div>
          <div></div>
          <button
            onClick={onClose}
            className="-translate-y-10 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          {/* </div> */}
        </div>

        {/* Body */}
        <div className="space-y-2 py-4">
          <p>
            <strong>Description:</strong> (description here) {item.id}
          </p>
          <p>
            {/* <strong>Date Due:</strong> {item.date} */}
            {/* <strong>Date Due (New):</strong> {item.dateNew.toDateString()} */}
            <strong>Date Due (New):</strong>{" "}
            {item.dateNew.toISOString().split("T")[0]}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-4">
          {/* <Link href="/user_inventory">
            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Edit
            </button>
          </Link> */}
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              onClose(); // close current modal
              onEdit(item); // tell parent to open edit modal
            }}
          >
            Edit
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
export default UserInventorySelectPopup;
