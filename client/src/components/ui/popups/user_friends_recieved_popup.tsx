// src/components/popups/user_groups_select_popup.tsx

// import Link from "next/link";
// import React from "react";
import React, { useEffect, useState } from "react";

import {
  acceptFriendRequest,
  declineFriendRequest,
  getIncomingRequests,
} from "../../../lib/api/friends";

export type FriendRequest = {
  id: number;
  sender: {
    id: number;
    username: string;
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function UserFriendsRecievedPopup({ isOpen, onClose }: Props) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    getIncomingRequests()
      .then((res) => {
        console.log("Incoming requests:", res.data);
        setRequests(res.data);
      })

      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Friend Requests</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading…</p>}

        {!loading && requests.length === 0 && (
          <p className="text-gray-500">No friend requests.</p>
        )}

        <div className="space-y-2">
          {requests.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span className="font-medium">{r.sender.username}</span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    acceptFriendRequest(r.id).then(() =>
                      setRequests((prev) =>
                        prev.filter((req) => req.id !== r.id),
                      ),
                    )
                  }
                  className="rounded bg-green-600 px-2 py-1 text-sm text-white"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    declineFriendRequest(r.id).then(() =>
                      setRequests((prev) =>
                        prev.filter((req) => req.id !== r.id),
                      ),
                    )
                  }
                  className="rounded bg-red-500 px-2 py-1 text-sm text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default UserFriendsRecievedPopup;
