// src/hooks/organization_clean_backend_calls.ts
import useSWR, { KeyedMutator } from "swr";

import type { Inventory_Details_Interface } from "../components/ui/card_organization_inventory_details_modal";
import { BASE_URL,getItems } from "./organization_call_backend";

// remember to
// cd intermediate_team_4
// cd client
// npm install swr

// the interface for the return
export interface organization_clean_backend_calls_return_interface {
  data: Inventory_Details_Interface[];
  loading: boolean;
  error: Error | null;
  refresh: () => KeyedMutator<Inventory_Details_Interface>; // Optional refresh function
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
export const useRecentActivities = (
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
      refreshInterval: 3, // Poll every 30 seconds 30000ms
      revalidateOnFocus: true, // Refresh when user clicks back into the tab
    },
  );

  const res: organization_clean_backend_calls_return_interface = {
    data: data || [],
    loading: isLoading,
    error: error,
    refresh: mutate, // SWR calls its refresh function "mutate"
  };

  return res;
};

/* to put inside the _app.js, it will set a global fetch 

import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        refreshInterval: 10000, // Optional: Poll for new data every 10 seconds globally
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

*/

/*

// filterType: used to add to backend url call
// isDev: true if we want to use mock data

export const getRecentActivities = (filterType: string, mode: string ) => {

  if (isDev) 
  {

  }
  else 
  {
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
  }
};
*/

//   // 2. "Cleaning" and "Operations" (Sorting/Formatting)
//   const cleanedData = json.map((item: any) => ({
//     id: item.id,
//     title: item.action_name, // Mapping Django snake_case to Frontend camelCase
//     detail: item.target_object,
//     time: formatMyDate(item.timestamp), // Formatting logic
//     status: item.change_type === 'increase' ? 'up' : 'down'
//   }));

//   setData(cleanedData);

/* How to use swr original without global fetch 

import useSWR from 'swr';

// 1. Define a simple fetcher function (standard for SWR)
const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useActivities = (filterType: string) => {
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
};






//This function is used to invoke the get/post/put/delete calls to the backend for the data data
const useActivities = (filterType: string) => {
  // this is the data from the backend
  const [data, setData] = useState([]);
  
  // this is to update the state of the data
  const [loading, setLoading] = useState(true);

  // runs code on the backend as a side effect 
  // the idea is, to useEffect, is used to decide on the timing
  // bridge between react rendering and calling backend 
  // makes sure that the code rendering is not blocked by the backend call
  // it will rerun if the second parameter changes useEffect(() => {}, [second parameter])
  // it can also stop backend task 
  useEffect(() => {

    // async and await 
    // tells js how to handle task that takes time to finish 
    // so how does the 2 pair? 
    // when the filterType ( second param ) changes, triggers useEffect
    // useEffect calls fetchData
    // fetchData is async, so it starts the task and moves on 
    // when fetchData finishes, it updates the state of data and loading
    const fetchData = async () => {
      setLoading(true);

      // 1. Fetch from Django
      // const response = await fetch(`http://localhost:8000/api/data/?type=${filterType}`);
      // const json = await response.json();

      // setData(cleanedData);
      // setLoading(false);


      setLoading(false);
    };

    fetchData();
  }, [filterType]); // Re-run if the filter changes

  return { data, loading };
};
*/
