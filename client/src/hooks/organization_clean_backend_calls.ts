// src/hooks/organization_clean_backend_calls.ts
import useSWR, { KeyedMutator } from "swr";

import { Member_Details_Interface } from "@/components/card_organization_member_details_modal";

import type { Inventory_Details_Interface } from "../components/ui/card_organization_inventory_details_modal";
import {
  BASE_URL,
  createItem,
  getItems,
  getMembers,
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

export interface organization_clean_backend_calls_return_members_interface {
  data: Member_Details_Interface[];
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
  refresh: KeyedMutator<Member_Details_Interface[]>; // Optional refresh function
}

/*
This is the class that will call the backend to get the item data / set the item data / update the item data/ delete the item data

Remember, this will only be invoked once, when its mounted, if you want to call it peridocally, you need to set up a timer to call it periodically
*/

// 1. Define a simple fetcher function (standard for SWR)
// const fetcher = (url: string) => fetch(url).then(res => res.json());

// this is the one that will work with the clean function from api call
const fetcher = () => getItems("all");

/*
Even if we are calling mocks, we need to use useSWR

filterType: used to add to backend url call
isDev: true if we want to use mock data
*/
export const useOrganizationBackendGetItems = (
  filterType: string,
): organization_clean_backend_calls_return_interface => {
  // 2. SWR handles the state, the effect, and the async logic
  // useSWR(key, fetcher, options)
  // why use it? shows cache data while it fetches new data
  // key: API url
  // fetcher: a function that returns a promise
  // options: common options are: refreshInterval, revalidateOnFocus, revalidateOnReconnect, dedumpingInterval

  // more on fetcher
  // This is your fetcher normally
  // const fetcher = (url) => fetch(url).then(res => res.json());
  // useSWR is like UberEats app
  // fetcher is delivery driver that fetches the data
  // const { data } = useSWR('http://localhost:8000/api/data/', fetcher);

  // returns: data, error, isLoading, isValidating, mutate
  // data: the data returned by the fetcher function
  // error: the error returned by the fetcher function
  // isLoading: true if the data is being fetched, false otherwise
  // isValidating: true if the data is being validated, false otherwise
  // mutate: a function that triggers a new fetch

  /*
  // old
  const { data, error, isLoading } = useSWR(
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

  // SWR syntax: useSWR(key, fetcher, options)
  // why do we need an array ? and not just use filter type?
  // because this array will become a key ( cache collision prevention )
  // lets say we dont have the base URL
  // and we have data and inventory in the same filter type which is Electronics
  // const { data } = useSWR('Electronics', () => getActivities('Electronics'));
  // const { data } = useSWR('Electronics', () => getInventory('Electronics'));
  // lets say i pull data from data first, it will cache Electronics data
  // SWR will think oh, the keys are the same, so lets just use the cache
  // this is cache collission

  // mutate? what is that, so lets say we do polling every 30seconds and
  // ther is an inventory update that happened in between the 30seconds
  // SWR will immediately
  const { data, error, isLoading, mutate } = useSWR(
    [`${BASE_URL}`, filterType], // The "Key" (Unique identifier)
    fetcher, // The "Fetcher" (Your function)
    {
      refreshInterval: 30, // Poll every 30 seconds 30000ms
      revalidateOnFocus: true, // Refresh when user clicks back into the tab
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

// This is now a standard function, NOT a hook
// if it is a hook, it will not work, a hook means swr
export const createNewItemClean = async (
  itemData: Inventory_Details_Interface,
): Promise<boolean> => {
  // 1. Send the data to Django using your existing createItem function
  const response = await createItem(itemData);

  // 2. Return the result
  return response;
};

// MMEBERS section
const fetcher2 = () => getMembers("all");

/*
Even if we are calling mocks, we need to use useSWR

filterType: used to add to backend url call
isDev: true if we want to use mock data
*/
export const useOrganizationBackendGetMembers = (
  filterType: string,
): organization_clean_backend_calls_return_members_interface => {
  const { data, error, isLoading, mutate } = useSWR(
    [`${BASE_URL}`, filterType], // The "Key" (Unique identifier)
    fetcher2, // The "Fetcher" (Your function)
    {
      refreshInterval: 30, // Poll every 30 seconds 30000ms
      revalidateOnFocus: true, // Refresh when user clicks back into the tab
    },
  );

  const res: organization_clean_backend_calls_return_members_interface = {
    data: data || [],
    loading: isLoading,
    error: error,
    isSuccess: !isLoading && !error,
    refresh: mutate, // SWR calls its refresh function "mutate"
  };

  return res;
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

//   // to use useSWR for PUT
//   const { data, error, isLoading, mutate } = useSWR(
//     [`${BASE_URL}`, "newItem"],
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
