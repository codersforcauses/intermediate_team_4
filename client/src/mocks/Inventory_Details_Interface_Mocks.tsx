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
const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  // Formats to "DD MMM YYYY" (e.g., 10 Nov 2025)
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// 2. Mock data for the overlay fields
const now = new Date();
const lastMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  now.getDate(),
);
const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

export const generateRandomMockInventoryDetails =
  (): Inventory_Details_Interface => {
    // Helper to pick a random item from an array
    const getRandom = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    return {
      name: getRandom(names),
      details: getRandom(details),
      categories: getRandom(categories),
      availability: Math.random() > 0.5 ? "Available" : "Borrowed",
      organization: "Coders For Cause",
      borrowLocation: getRandom(locations),
      borrowerName: getRandom(users),

      // RANDOMLY GENERATED DATES:
      borrowedOn: getRandomDate(lastMonth, now), // Somewhere in the last 30 days
      returnedOn: getRandomDate(now, now), // Today
      dueOn: getRandomDate(now, nextYear), // Somewhere in the next year
      expiryDate: getRandomDate(now, nextYear), // Somewhere in the next year
    };
  };
