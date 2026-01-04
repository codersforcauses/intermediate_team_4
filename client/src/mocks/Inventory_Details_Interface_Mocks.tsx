import { Inventory_Details_Interface } from "../components/ui/card_organization_inventory_details_modal";

const names = [
  "Cool Potato",
  "Heavy Duty Drill",
  "First Aid Kit",
  "Projector B",
  "Foldable Chair",
];
const details = [
  "A very cool potato",
  "High-speed masonry drill",
  "Fully stocked medical kit",
  "4K Office projector",
  "Standard seating",
];
const categories = [
  "Food item",
  "Power Tools",
  "Safety",
  "Electronics",
  "Furniture",
];
const locations = [
  "UWA Crawley",
  "Guild Storage",
  "Reid Library",
  "Engineering Block",
];
const users = ["Arush", "Cody", "Jane Doe", "Alex Smith", "System"];

/*
 Generates a random Inventory_Details_Interface object
 */

// 1. Helper Function: Generates a random date string
const getRandomDateTime = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  // Formats to e.g., "10 Nov 2025, 14:30"
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use true for AM/PM
  });
};

// 2. Mock data for the overlay fields
const now = new Date();
// const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const lastMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  now.getDate(),
);
const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

// --- Random time within TODAY ---
// const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
// const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

// const startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 10, 0);
// const endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1, 59);

// const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000)); // Current time minus 3,600,000 milliseconds
const currentTime = now;

const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000); // Current time minus 60,000 milliseconds

// const randomTimeToday = getRandomDateTime(startOfToday, endOfToday);

export const generateRandomMockInventoryDetails =
  (): Inventory_Details_Interface => {
    // Helper to pick a random item from an array
    const getRandom = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const id = Math.floor(Math.random() * 10); // Random ID between 0-9

    return {
      id: id, // Random ID between 0-9
      name: getRandom(names),
      details: getRandom(details),
      categories: getRandom(categories),
      availability: Math.random() > 0.5 ? "Available" : "Borrowed",
      organization: "Coders For Cause",
      collectionPoint: getRandom(locations),
      borrowerName: getRandom(users),

      // RANDOMLY GENERATED DATES:
      borrowedOn: getRandomDateTime(lastMonth, now), // Somewhere in the last 30 days
      returnedOn: getRandomDateTime(now, now), // Today
      dueOn: getRandomDateTime(now, nextYear), // Somewhere in the next year
      expiryDate: getRandomDateTime(now, nextYear), // Somewhere in the next year
      dateAdded: getRandomDateTime(oneMinuteAgo, currentTime), // Somewhere between yesteday and today
    };
  };

/*
  // Example data structure that the component might use (or receive as props later)
const mockActivityData = [
  {
    id: 1,
    type: "member" as const,
    status: "up" as const,
    title: "New Member",
    detail: "Cody",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "member" as const,
    status: "up" as const,
    title: "Inventory increase",
    detail: "Cool Potato",
    quantity: 1,
    time: "5 minutes ago",
  },
  {
    id: 3,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 4,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 5,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 6,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 7,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 8,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 9,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 10,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 11,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 12,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 13,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 14,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 15,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  {
    id: 16,
    type: "member" as const,
    status: "down" as const,
    title: "Lost Member",
    detail: "Cody",
    quantity: -1,
    time: "3 minutes ago",
  },
  // Add more items here...
];
*/
