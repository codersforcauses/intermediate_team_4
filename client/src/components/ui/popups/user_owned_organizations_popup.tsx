// src/components/popups/user_groups_select_popup.tsx

// import Link from "next/link";
// import React from "react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { cancelFriendRequest, getSentRequests } from "../../../lib/api/friends";

export type FriendRequest = {
  id: number;
  receiver: {
    id: number;
    username: string;
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function UserOwnedOrganizations({ isOpen, onClose }: Props) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    getSentRequests()
      .then((res) => setRequests(res.data))
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
              <span className="font-medium">{r.receiver.username}</span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    cancelFriendRequest(r.id).then(() =>
                      setRequests((prev) =>
                        prev.filter((req) => req.id !== r.id),
                      ),
                    )
                  }
                  className="rounded bg-red-500 px-2 py-1 text-sm text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link href="../../../organization_dashboard">
          <button className="rounded bg-red-500 px-2 py-1 text-sm text-white">
            Temporary Organizations Button
          </button>
        </Link>
      </div>
    </div>
  );
}
export default UserOwnedOrganizations;
