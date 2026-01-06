// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect,useState } from "react";

import FriendItemModal from "../popups/user_friends_select_popup";

export type MyFriends = {
  id: number;
  name: string;
};

const UserFriendsTable = () => {
  const [selectedItem, setSelectedItem] = useState<MyFriends | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data (replace with Django API call later)
  const [friends, SetFriends] = useState<MyFriends[]>([]);
  // Mock data (replace with Django API call later)
  useEffect(() => {
    const mockFriend: MyFriends[] = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Friend ${i + 1}`,
    }));
    SetFriends(mockFriend);
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
              <span className="font-medium text-gray-800">{item.name}</span>
            </div>
          ))
        )}
      </div>
      <FriendItemModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
export default UserFriendsTable;
