// src/hooks/organization_call_backend.ts
// Change this URL to match your backend API endpoint

import { Inventory_Details_Interface } from "@/components/ui/card_organization_inventory_details_modal";
import { Member_Details_Interface } from "@/components/ui/card_organization_member_details_modal";
import { generateRandomMockInventoryDetails } from "@/mocks/Inventory_Details_Interface_Mocks";
import { generateMockMember } from "@/mocks/Members_Details_Interface_Mocks";

// tha main URL
export const BASE_INVENTORY_URL = "http://localhost:8000/api/inventory/";

// change when backend is ready
const isDev: boolean = false;

// --- GET: Fetch all items ---
export const getItems = async (
  URL: string,
): Promise<Inventory_Details_Interface[]> => {
  if (isDev) {
    // Mock data for development
    const mockData: Inventory_Details_Interface[] = [];
    for (let i = 0; i < 10; i++) {
      mockData.push(generateRandomMockInventoryDetails());
    }
    console.log("Mock data generated:", mockData);
    return mockData;
  } else {
    // 1. Fetch from Django
    // fetch() is used to get the data from backend using URL
    // `${}` is place holders for code, anything inside the curly braces is code
    const response = await fetch(`${URL}`);

    // 2. Check if the request was successful
    if (!response.ok) throw new Error("Failed to fetch");

    // 3. Parse the JSON data
    // because fetcah returns a response, it isnt the data yet,
    // its just the response header,
    // you will need to use .json() to get the data
    // it converts raw bytes to Javascript objects
    return await response.json(); // Returns the list from Django
  }
};

// --- POST: Create a new item ---
// .stringify, flattens the object
// headers: { 'Content-Type': 'application/json' } determine, how the data will be dealt with by the server
// possible types: text/plain, text/html application/json, images/jpeg, application/x-www-form-urlencoded ( form data ),
// if you dont have this, might get error 400
export const createItem = async (
  newData: Inventory_Details_Interface,
): Promise<boolean> => {
  if (isDev) {
    console.log("Mock create item called with data:", newData);
    return true; // Simulate successful creation
  } else {
    const response = await fetch(BASE_INVENTORY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // must return true when coding backend
    return await response.json();
  }
};

// --- PATCH/PUT: Update an existing item ---
export const updateItem = async (
  id: number,
  newData: Inventory_Details_Interface,
) => {
  // Django usually expects a trailing slash after the ID
  const response = await fetch(`${BASE_INVENTORY_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  return await response.json();
};

// --- DELETE: Remove an item ---
export const deleteItem = async (id: number) => {
  const response = await fetch(`${BASE_INVENTORY_URL}${id}/`, {
    method: "DELETE",
  });
  // DELETE usually returns a 204 No Content status, so we don't always .json() it
  return response.ok;
};

// MEMBERS SECTION

export const getMembers = async (
  filterType: string,
): Promise<Member_Details_Interface[]> => {
  if (isDev) {
    // Mock data for development
    const mockData: Member_Details_Interface[] = [];
    for (let i = 0; i < 10; i++) {
      mockData.push(generateMockMember());
    }
    console.log("Mock data generated:", mockData);
    return mockData;
  } else {
    // 1. Fetch from Django
    // fetch() is used to get the data from backend using URL
    const response = await fetch(`${BASE_INVENTORY_URL}?type=${filterType}`);

    // 2. Check if the request was successful
    if (!response.ok) throw new Error("Failed to fetch");

    // 3. Parse the JSON data
    // because fetcah returns a response, it isnt the data yet,
    // its just the response header,
    // you will need to use .json() to get the data
    // it converts raw bytes to Javascript objects
    return await response.json(); // Returns the list from Django
  }
};

export const createMember = async (
  newData: Member_Details_Interface,
): Promise<boolean> => {
  if (isDev) {
    console.log("Mock create Member called with data:", newData);
    return true; // Simulate successful creation
  } else {
    const response = await fetch(BASE_INVENTORY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // must return true when coding backend
    return await response.json();
  }
};

// --- PATCH/PUT: Update an existing Member ---
export const updateMember = async (
  id: number,
  newData: Member_Details_Interface,
) => {
  // Django usually expects a trailing slash after the ID
  const response = await fetch(`${BASE_INVENTORY_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  return await response.json();
};

// --- DELETE: Remove an Member ---
export const deleteMember = async (id: number) => {
  const response = await fetch(`${BASE_INVENTORY_URL}${id}/`, {
    method: "DELETE",
  });
  // DELETE usually returns a 204 No Content status, so we don't always .json() it
  return response.ok;
};
