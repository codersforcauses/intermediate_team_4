// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect, useState } from "react";

import { getFriends } from "../../../lib/api/friends";
import { Friend } from "../../../types/friends";
import FriendItemModal from "../popups/user_friends_select_popup";

const UserFriendsTable = () => {
  const [selectedItem, setSelectedItem] = useState<Friend | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleFriendRemoved = (id: number) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(res.data.friends);
    });
  }, []);

  return (
    <>
      {/* Scrollable container */}
      <div className="flex-1 cursor-pointer overflow-y-auto rounded-md border">
        {/* logic for clicking to open pop-up window to edit/resolve an item*/}

        {friends.length === 0 ? (
          <p className="py-6 text-center text-gray-500">No friends found.</p>
        ) : (
          friends.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-between border-b px-3 py-3 last:border-b-0 hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{item.username}</span>
            </div>
          ))
        )}
      </div>
      <FriendItemModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onFriendRemoved={handleFriendRemoved}
      />
    </>
  );
};
export default UserFriendsTable;
