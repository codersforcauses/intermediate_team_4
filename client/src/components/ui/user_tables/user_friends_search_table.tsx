import { useEffect, useState } from "react";

import { useAuth } from "../../../context/AuthContext";
// import { searchUsers } from "..//../../lib/api/friends";
import { searchUsers } from "../../../lib/api/friends";
import FriendAddItemModal from "../popups/user_friends_add_popup";

export type OtherUsers = {
  id: number;
  username: string;
  is_me: boolean;
  is_friend: boolean;
  request_sent: boolean;
  request_received: boolean;
};

const UserFriendsAddTable = () => {
  const { user, loading } = useAuth();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OtherUsers[]>([]);
  const [selectedUser, setSelectedUser] = useState<OtherUsers | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);

    const timeout = setTimeout(() => {
      searchUsers(query)
        .then((res) => setResults(res.data))
        .finally(() => setSearching(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (loading) return <p className="p-4">Loading user…</p>;
  if (!user) return <p className="p-4">You are not logged in.</p>;

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-3 text-xl font-bold">Add Friends</h2>

      <input
        className="mb-3 rounded border p-2"
        placeholder="Search users by username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto rounded-md border">
        {searching && <p className="p-3 text-gray-500">Searching…</p>}

        {!searching && results.length === 0 && query && (
          <p className="p-3 text-gray-500">No users found.</p>
        )}

        {results.map((u) => (
          <div
            key={u.id}
            onClick={() => !u.is_me && setSelectedUser(u)}
            className={`flex items-center justify-between border-b px-3 py-2 hover:bg-gray-50 ${
              u.is_me ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            <div>
              <span className="font-medium">{u.username}</span>
              {u.is_me && <span className="ml-2 text-gray-400">(you)</span>}
            </div>

            <div className="text-sm">
              {u.is_friend && <span className="text-green-600">Friend</span>}
              {u.request_sent && (
                <span className="text-yellow-600">Requested</span>
              )}
              {u.request_received && (
                <span className="text-blue-600">Sent you a request</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <FriendAddItemModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserFriendsAddTable;
