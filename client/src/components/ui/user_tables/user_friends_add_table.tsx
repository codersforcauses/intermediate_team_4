// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect,useState } from "react";

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
  const [selectedItem, setSelectedItem] = useState<OtherUsers | null>(null);
  const [query, setQuery] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data (replace with Django API call later)
  const [users, SetUsers] = useState<OtherUsers[]>([]);
  // Mock data (replace with Django API call later)
  useEffect(() => {
    if (!query) {
      SetUsers([]);
      return;
    }
    const timeout = setTimeout(() => {
      searchUsers(query).then((res) => SetUsers(res.data));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <input
        className="mb-2 w-full border p-2"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-[400px] overflow-y-auto rounded border">
        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => setSelectedItem(u)}
            className="flex cursor-pointer justify-between px-3 py-2 hover:bg-gray-100"
          >
            <span>{u.username}</span>
            {u.is_friend && <span className="text-green-600">Friend</span>}
            {u.request_sent && (
              <span className="text-yellow-600">Requested</span>
            )}
            {u.request_received && (
              <span className="text-blue-600">Sent you a request</span>
            )}
          </div>
        ))}
      </div>

      {selectedItem && (
        <FriendAddItemModal
          user={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};
export default UserFriendsAddTable;
