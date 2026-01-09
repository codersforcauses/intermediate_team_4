// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect,useState } from "react";

import GroupsItemModal from "../popups/user_groups_select_popup";

export type MyGroups = {
  id: number;
  name: string;
};

const UserGroupsTable = () => {
  const [selectedItem, setSelectedItem] = useState<MyGroups | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data (replace with Django API call later)
  const [groups, SetGroups] = useState<MyGroups[]>([]);
  // groups mock data
  useEffect(() => {
    const mockGroups: MyGroups[] = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Group ${i + 1}`,
    }));
    SetGroups(mockGroups);
  }, []);

  return (
    <>
      {/* Scrollable container */}
      <div className="flex-1 cursor-pointer overflow-y-auto rounded-md border">
        {/* logic for clicking to open pop-up window to edit/resolve an item*/}

        {groups.length === 0 ? (
          <p className="py-6 text-center text-gray-500">No groups found.</p>
        ) : (
          groups.map((item) => (
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
      <GroupsItemModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
export default UserGroupsTable;
