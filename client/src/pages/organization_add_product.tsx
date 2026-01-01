// 1. Swap react-router-dom for next/router
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSWRConfig } from "swr/_internal";

import Header from "@/components/ui/navbar_organization";
import { BASE_URL } from "@/hooks/organization_call_backend";
import { createNewItemClean } from "@/hooks/organization_clean_backend_calls";
// import { createItem } from '../hooks/organization_call_backend';

const Organization_Add_Product = () => {
  // it creates a page stack that we can use to navigate
  // when to use and should we replace all href with router.push?
  // we only use this when we want to have buttons that go back to certain pages or after finishing a task
  // we use Link href when we want to move to static pages
  const router = useRouter();

  // this is the form data management state
  // so that meaans itsl like a clipboard, at the start its empty, but when the user writes, it updates
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    collectionPoint: "",
    expiryDate: "",
  });

  // used whenever you type in the form fields
  // e is event, and we get the name and value from the target of the event
  const handleChange = (
    // so only handle changes in input or textarea elements
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // name is the name of the element like details field
    // value is the input
    const { name, value } = e.target;

    // it copies the exisiting form data and updates the field that changed\
    // use brackets to use a variable as the key name
    // if no brackets, it would just update the name field
    setFormData({ ...formData, [name]: value });
  };

  // this is to get the refresh function from SWR
  const { mutate } = useSWRConfig(); // 1. Initiate at the TOP

  const handleSave = async (e: React.FormEvent) => {
    // this is to prevent the page from emptying all the fields and refreshing
    e.preventDefault();

    try {
      // 2. Call the action (The "Messenger")
      await createNewItemClean(formData);

      // 3. Tell SWR to refresh the Dashboard data
      // This tells SWR: "The data at BASE_URL is old, please go get the new list!"
      mutate([`${BASE_URL}`, "all"]);

      alert("Product Saved!");

      // go back to dashboard
      // router.push('/organization_dashboard');
      router.back();
    } catch (error) {
      alert("Failed to save product: " + error);
    }
  };

  return (
    <main>
      <Header />
      <div className="form-container">
        <h2 className="form-title">Add New Product</h2>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Details</label>
            <textarea
              className="form-textarea"
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Collection Point</label>
            <input
              className="form-input"
              name="collectionPoint"
              value={formData.collectionPoint}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-input"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-save">
              Save
            </button>

            {/* 4. Use router.back() for the cancel button */}
            <button
              type="button"
              className="btn-cancel"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Organization_Add_Product;

/*
Notes on why useSWR dosent work 
1. can only be invoked on the top level of the component, 
  1.1 so why our code can use useSWR in the backend calls in getAllItemsClean but cannot in the post?
    1.1.1 that is because getAllItemsClean is invoked at the page level, so its top level
    1.1.2 but createNewItemClean is invoked inside a button, so its not top level
2. useSWR is like a camera, it watches a URL, using it to save is wrong 

so what did we do instead?
1. change the call to a direct async
2. perform a manual refresh 

what is uswSWRConfig and mutate?\
- SWR is a warehouse
- useSWR is like a  worker workign in  a specific aisle (URL)
- useSWRConfig is like the warehouse manager, it has access to all aisles (all URLs)
- so when we call the mutate allows u to walk to anyw aisle and do something

*/
