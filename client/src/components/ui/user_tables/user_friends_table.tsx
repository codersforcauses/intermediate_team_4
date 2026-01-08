// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect, useState } from "react";

import { getFriends } from "../../../lib/api/friends";
import { Friend } from "../../../types/friends";
import FriendItemModal from "../popups/user_friends_select_popup";

// export type MyFriends = {
//   id: number;
//   username: string;

// };
//   profile_picture?: string | null;

const UserFriendsTable = () => {
  // const [selectedItem, setSelectedItem] = useState<MyFriends | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [friends, SetFriends] = useState<MyFriends[]>([]);
  const [selectedItem, setSelectedItem] = useState<Friend | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  // Mock data (replace with Django API call later)
  // useEffect(() => {
  //   getFriends().then((res) => {
  //     const normalized = res.data.friends.map((f: any) => ({
  //       id: f.id,
  //       username: f.username,
  //       // profile_picture: f.profile_picture,
  //     }));

  //     SetFriends(normalized);
  //   });
  // }, []);
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
      />
    </>
  );
};
export default UserFriendsTable;
