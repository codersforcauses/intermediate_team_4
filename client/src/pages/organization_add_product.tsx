// 1. Swap react-router-dom for next/router
import { useRouter } from "next/router";
import React, { useState } from "react";
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // This is important to keep the page from refreshing!

    // try {
    //   await createItem(formData);
    //   alert("Product Saved Successfully!");

    //   // 3. Navigate back to the dashboard
    //   router.push('/organization_dashboard');
    // } catch (error) {
    //   alert("Error saving data");
    //   console.error(error);
    // }
  };

  return (
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
  );
};

export default Organization_Add_Product;
