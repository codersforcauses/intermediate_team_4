// 1. Swap react-router-dom for next/router
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { createItem } from '../hooks/organization_call_backend';

const OrganizationAddProduct = () => {
  // 2. Initialize the Next.js router
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    collectionPoint: "",
    expiryDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
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

export default OrganizationAddProduct;
