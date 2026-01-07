// src/pages/user_dashboard.tsx (Update the import path)
//import "";
import { useEffect, useState } from "react";

import UserInventoryEditPopup from "../popups/user_inventory_edit_popup";
import InventoryItemModal from "../popups/user_inventory_select_popup";

export type InventoryItem = {
  id: number;
  name: string;
  date: string;
  dateNew: Date;
  // dateNew: Date = new Date(date);
};

const UserInventoryTable = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data (replace with Django API call later)
  useEffect(() => {
    const mockInventory: InventoryItem[] = Array.from(
      { length: 30 },
      (_, i) => {
        const dateStr =
          ((Math.floor(Math.random() * 10) % 11) + 1).toString() +
          "-" +
          (Math.floor(Math.random() * 10) + 1).toString() +
          "-2026";

        // Parse MM-DD-YYYY safely
        const [month, day, year] = dateStr.split("-").map(Number);

        return {
          id: i + 1,
          name: `Item ${i + 1}`,
          date: dateStr,
          dateNew: new Date(year, month - 1, day), // month is 0-based
        };
      },
    );
    {
      /* have 
          is_due_soon = date is larger than 2 weeks
          in the array? -- as flag for due soon inventory */
    }
    setInventory(mockInventory);
  }, []);

  return (
    <>
      {/* Scrollable container */}
      <div className="flex-1 cursor-pointer overflow-y-auto rounded-md border">
        {/* logic for clicking to open pop-up window to edit/resolve an item*/}

        {inventory.length === 0 ? (
          <p className="py-6 text-center text-gray-500">No items found.</p>
        ) : (
          inventory.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-between border-b px-3 py-3 last:border-b-0 hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="font-medium text-gray-800">
                {/* date:{item.date} */}
                {/* date(New): {item.dateNew.toDateString()} */}
                date(New): {item.dateNew.toISOString().split("T")[0]}
              </span>
            </div>
          ))
        )}
      </div>
      <InventoryItemModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onEdit={(item) => {
          setIsModalOpen(false);
          setSelectedItem(item);
          setIsEditModalOpen(true);
        }}
      />
      <UserInventoryEditPopup
        isOpen={isEditModalOpen}
        item={selectedItem}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
export default UserInventoryTable;
