import type { Members_Details_Interface } from "../pages/organization_member_management";

export const generateMockMember = (): Members_Details_Interface => {
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana Prince",
    "Ethan Hunt",
  ];
  const levels = ["Admin", "Moderator", "Member", "Guest"];

  return {
    id: Math.floor(Math.random() * 10000),
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${Math.floor(Math.random() * 10000)}@example.com`,
    phoneNumber: `+65 ${Math.floor(Math.random() * 90000000 + 10000000)}`,
    notes: "Regular contributor to the community garden project.",

    permissionLevel: levels[Math.floor(Math.random() * levels.length)],
    joinedOn: "12 Oct 2023, 09:15", // You can use your getRandomDateTime here
    isStillHere: Math.random() > 0.2, // 80% chance they are still here

    itemsBorrowed: Math.floor(Math.random() * 15),
    lastBorrowedOn: "01 Jan 2026, 14:30",

    totalFriends: Math.floor(Math.random() * 50),
    totalClubs: Math.floor(Math.random() * 5),
    clubs: ["Chess Club", "Hiking Society", "Book Worms"],
  };
};
