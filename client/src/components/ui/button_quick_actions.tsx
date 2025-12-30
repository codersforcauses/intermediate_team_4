// src/components/button_quick_actions.tsx

import Link from "next/link";
import React from "react";

const Quick_Actions = () => {
  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Quick Actions</h3>

      <div className="action-button-group">
        {/* 2. RIGHT COLUMN: Quick Actions */}
        <aside className="actions-panel">
          {/* This is where the Quick_Actions component will go */}
          {/* Button 1: Add Product */}
          <Link href="/organization_add_product">
            <button className="action-button primary">
              <span className="icon-plus">+</span>
              Add Product
            </button>
          </Link>

          {/* Button 2: View Whole Inventory */}
          <Link href="/organization_inventory">
            <button className="action-button secondary">
              {/* Replace with an actual icon later */}
              <span className="icon-box">📦</span>
              View Whole Inventory
            </button>
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Quick_Actions;
