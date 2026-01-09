// src/hooks/organization_clean_backend_calls.ts
import useSWR, { KeyedMutator } from "swr";

import { Member_Details_Interface } from "@/components/ui/card_organization_member_details_modal";

import type { Inventory_Details_Interface } from "../card_organization_inventory_details_modal";
import {
  BASE_INVENTORY_URL,
  COUNT_ITEMS_DUE_LAST_WEEK_URL,
  COUNT_ITEMS_DUE_THIS_WEEK_URL,
  createItem,
  createMember,
  deleteItem,
  django_count_response_interface,
  getItems,
  getItemsDueThisWeek,
  getMembers,
  updateItem,
  updateMember,
} from "./organization_call_backend";

// remember to
// cd intermediate_team_4
// cd client
// npm install swr

// the interface for the return
export interface organization_clean_backend_calls_return_interface {
  data: Inventory_Details_Interface[];
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
  refresh: KeyedMutator<Inventory_Details_Interface[]>; // Optional refresh function
}

export interface organization_clean_backend_calls_return_get_members_interface {
  data: Member_Details_Interface[];
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
  refresh: KeyedMutator<Member_Details_Interface[]>; // Optional refresh function
}

export interface organization_clean_backend_calls_return_boolean_members_interface {
  data: boolean;
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
  refresh: KeyedMutator<boolean>; // Optional refresh function
}

export interface organization_clean_backend_calls_return_number_interface {
  data: number;
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
  refresh: KeyedMutator<django_count_response_interface>; // Optional refresh function
}

/*
This is the class that will call the backend to get the item data / set the item data / update the item data/ delete the item data

Remember, this will only be invoked once, when its mounted, if you want to call it peridocally, you need to set up a timer to call it periodically
*/

// 1. Define a simple fetcher function (standard for SWR)
// const fetcher = (url: string) => fetch(url).then(res => res.json());

/*
Even if we are calling mocks, we need to  SWR

filterType: d to add to backend url call
isDev: true if we want to  mock data
*/
export const useOrganizationBackendGetItems = (
  category: string,
  sortBy: string,
): organization_clean_backend_calls_return_interface => {
  // 2. SWR handles the state, the effect, and the async logic
  // SWR(key, fetcher, options)
  // why  it? shows cache data while it fetches new data
  // key: API url
  // fetcher: a function that returns a promise
  // options: common options are: refreshInterval, revalidateOnFocus, revalidateOnReconnect, dedumpingInterval

  // more on fetcher
  // This is your fetcher normally
  // const fetcher = (url) => fetch(url).then(res => res.json());
  // SWR is like UberEats app
  // fetcher is delivery driver that fetches the data
  // const { data } = SWR('http://localhost:8000/api/data/', fetcher);

  // returns: data, error, isLoading, isValidating, mutate
  // data: the data returned by the fetcher function
  // error: the error returned by the fetcher function
  // isLoading: true if the data is being fetched, false otherwise
  // isValidating: true if the data is being validated, false otherwise
  // mutate: a function that triggers a new fetch

  /*
  // old
  const { data, error, isLoading } = SWR(
    `/api/data?type=${filterType}`, 
    fetcher,
    { refreshInterval: 10000 } // This handles the "polling" automatically!
  );

  return { 
    data: data || [], 
    loading: isLoading,
    error 
  };
  */

  // SWR syntax: SWR(key, fetcher, options)
  // why do we need an array ? and not just  filter type?
  // beca this array will become a key ( cache collision prevention )
  // lets say we dont have the base URL
  // and we have data and inventory in the same filter type which is Electronics
  // const { data } = SWR('Electronics', () => getActivities('Electronics'));
  // const { data } = SWR('Electronics', () => getInventory('Electronics'));
  // lets say i pull data from data first, it will cache Electronics data
  // SWR will think oh, the keys are the same, so lets just  the cache
  // this is cache collission

  // mutate? what is that, so lets say we do polling every 30seconds and
  // ther is an inventory update that happened in between the 30seconds
  // SWR will immediately

  // generate the URL
  // 1. GENERATE THE URL STRING
  // Instead of complex if/else, we use URLSearchParams
  const params = new URLSearchParams();
  if (category && category !== "") params.append("categories", category); // Django expects 'categories'
  if (sortBy && sortBy !== "") params.append("ordering", sortBy); // Django expects 'ordering'

  // If params exist, add '?' and the params, otherwise just the base URL
  const queryString = params.toString();

  // 2. Fix the URL construction
  // We need backticks ` ` to use ${}
  // We need to add 'items/' because the router is registered there
  const finalUrl = queryString
    ? `${BASE_INVENTORY_URL}?${queryString}`
    : `${BASE_INVENTORY_URL}`;

  const { data, error, isLoading, mutate } = useSWR(
    finalUrl, // The "Key" (Unique identifier)
    getItems, // The "Fetcher" (Your function)
    {
      refreshInterval: 30, // Poll every 30 seconds 30000ms
      revalidateOnFocus: true, // Refresh when r clicks back into the tab
    },
  );

  const res: organization_clean_backend_calls_return_interface = {
    data: data || [],
    loading: isLoading,
    error: error,
    isSuccess: !isLoading && !error,
    refresh: mutate, // SWR calls its refresh function "mutate"
  };

  return res;
};

export const useOrganizationBackendCountItemsDueThisWeek =
  (): organization_clean_backend_calls_return_number_interface => {
    const { data, error, isLoading, mutate } = useSWR(
      COUNT_ITEMS_DUE_THIS_WEEK_URL, // The "Key" (Unique identifier)
      getItemsDueThisWeek, // The "Fetcher" (Your function)
      {
        refreshInterval: 30, // Poll every 30 seconds 30000ms
        revalidateOnFocus: true, // Refresh when r clicks back into the tab
      },
    );

    const res: organization_clean_backend_calls_return_number_interface = {
      data: data?.count || 0,
      loading: isLoading,
      error: error,
      isSuccess: !isLoading && !error,
      refresh: mutate, // SWR calls its refresh function "mutate"
    };

    return res;
  };

export const useOrganizationBackendCountItemsDueLastWeek =
  (): organization_clean_backend_calls_return_number_interface => {
    const { data, error, isLoading, mutate } = useSWR(
      COUNT_ITEMS_DUE_LAST_WEEK_URL, // The "Key" (Unique identifier)
      getItemsDueThisWeek, // The "Fetcher" (Your function)
      {
        refreshInterval: 30, // Poll every 30 seconds 30000ms
        revalidateOnFocus: true, // Refresh when r clicks back into the tab
      },
    );

    const res: organization_clean_backend_calls_return_number_interface = {
      data: data?.count || 0,
      loading: isLoading,
      error: error,
      isSuccess: !isLoading && !error,
      refresh: mutate, // SWR calls its refresh function "mutate"
    };

    return res;
  };

// This is now a standard function, NOT a hook
// if it is a hook, it will not work, a hook means swr
export const createItemClean = async (
  itemData: Partial<Inventory_Details_Interface> | Inventory_Details_Interface,
): Promise<boolean> => {
  itemData.organization = "Demo Organization"; // Temporary hardcoded value

  // 1. Send the data to Django using your existing createItem function
  const response = await createItem(itemData as Inventory_Details_Interface);

  // 2. Return the result
  return response;
};

export const updateItemClean = async (
  itemData: Partial<Inventory_Details_Interface> | Inventory_Details_Interface,
): Promise<boolean> => {
  const id = itemData.id ? itemData.id : 0;

  // 1. Send the data to Django using your existing updateItem function
  const response = await updateItem(
    id,
    itemData as Inventory_Details_Interface,
  );

  // 2. Return the result
  return response;
};

export const deleteItemClean = async (itemId: number): Promise<boolean> => {
  console.log("Deleting item with ID:", itemId);
  // Replace with your actual delete backend call:
  return await deleteItem(itemId);
  return Promise.resolve(true);
};

// MMEBERS section
const fetcher2 = () => getMembers("all");

/*
Even if we are calling mocks, we need to  SWR

filterType: d to add to backend url call
isDev: true if we want to  mock data
*/
export const useOrganizationBackendGetMembers = (
  filterType: string,
): organization_clean_backend_calls_return_get_members_interface => {
  const { data, error, isLoading, mutate } = useSWR(
    [`${BASE_INVENTORY_URL}`, filterType], // The "Key" (Unique identifier)
    fetcher2, // The "Fetcher" (Your function)
    {
      refreshInterval: 30, // Poll every 30 seconds 30000ms
      revalidateOnFocus: true, // Refresh when r clicks back into the tab
    },
  );

  const res: organization_clean_backend_calls_return_get_members_interface = {
    data: data || [],
    loading: isLoading,
    error: error,
    isSuccess: !isLoading && !error,
    refresh: mutate, // SWR calls its refresh function "mutate"
  };

  return res;
};
/**
 * Standard function to create a new member.
 */
export const createMemberClean = async (
  memberData: Partial<Member_Details_Interface> | Member_Details_Interface,
): Promise<boolean> => {
  return await createMember(memberData as Member_Details_Interface);
};

/**
 * Standard function to update an existing member.
 */
export const updateMemberClean = async (
  memberData: Partial<Member_Details_Interface> | Member_Details_Interface,
): Promise<boolean> => {
  const id = memberData.id ? memberData.id : 0;
  return await updateMember(id, memberData as Member_Details_Interface);
};

/**
 * Standard function to delete a member.
 */
export const deleteMemberClean = async (memberId: number): Promise<boolean> => {
  console.log("Deleting member with ID:", memberId);
  // Replace with your actual delete backend call:
  // return await deleteMember(memberId);
  return Promise.resolve(true);
};

// export interface organization_clean_backend_calls_input_interface {
//   data: Inventory_Details_Interface[];
//   loading: boolean;
//   error: Error | null;
//   isSuccess: boolean; //
//   refresh: KeyedMutator<Inventory_Details_Interface[]>; // Optional refresh function
// }

// export const createNewItemClean = (
//   itemData: Inventory_Details_Interface,
// ): organization_clean_backend_calls_return_interface => {

//   // to  SWR for PUT
//   const { data, error, isLoading, mutate } = SWR(
//     [`${BASE_INVENTORY_URL}`, "newItem"],
//     () => createItem(itemData),
//     {
//       revalidateOnFocus: true,
//     },
//   );

//   const res: organization_clean_backend_calls_return_interface = {
//     data: data || [],
//     loading: isLoading,
//     error: error,
//     isSuccess: !isLoading && !error,
//     refresh: mutate,
//   };

//   return res;
// };
