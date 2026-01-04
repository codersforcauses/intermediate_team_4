// src/components/Header.tsx

/*
How does the dropdown meny work?
1. the menu is hidden (isDropdownOpen = false)
2. when the user clicks on the profile area, the toggleDropdown function is called, which toggles the state to true,
making the menu visible by setting isDropdownOpen to true.

Common issues:
1. The menu closes immediately when clicking on it. because you use onClick instead of MouseDown
  user starts a click with OnClick and the browser processes the entire click event, which makes the wrapper in focus state, 
  and since the menu exist now ( on True ), it triggers the onBlur event, closing the menu.

useState()
- const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        ^ variable       ^ setter function    ^ initial state
- used to add states in functional components.

onBlur 
- An event that occurs when an element loses focus or not the main thing the user will interact with.
- Here, it is used to close the dropdown menu when the user clicks outside of it.

onMouseDown vs onClick
- onMouseDown: Triggered when the mouse button is pressed down.
- onClick: Triggered when the mouse button is pressed and released.
- In this case, onMouseDown is used to toggle the dropdown menu to ensure it opens before any blur event can occur.

*/

// this is for the dropdown menu from user profile side
import Link from "next/link";
import React, { useState } from "react"; // <-- Import useState

const Header = () => {
  // 1. Initialize state for the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper functions to control the state
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // We keep the handleBlur logic simple (for when the user clicks *outside* the entire element)
  const handleBlur = () => {
    // A small delay is still necessary to ensure the menu's buttons are clickable
    // before the menu hides.
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <header className="app-header">
      {/* Left side: Logo */}
      <div className="header-logo">
        <span>Logo</span>
      </div>
      {/* Center: Navigation Links */}
      <nav className="header-nav">
        <ul>
          <Link href="/organization_dashboard">
            <li>Home</li>
          </Link>
          <Link href="/organization_activity">
            <li>Activity</li>
          </Link>
          <Link href="/organization_member_management">
            <li>Management</li>
          </Link>
        </ul>
      </nav>

      {/* Right side: User Profile */}
      <div
        className="header-user-wrapper"
        onMouseDown={toggleDropdown}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <div className="header-user">
          <div className="user-avatar-placeholder"></div>
          <span>User</span>
        </div>

        {isDropdownOpen && (
          <div
            className="user-dropdown-menu"
            // Add onMouseDown=e.preventDefault() to buttons
            // to prevent the blur event from firing when they are clicked.
            onMouseDown={(e) => e.preventDefault()}
          >
            <button className="dropdown-item">Switch to Client</button>
            <button className="dropdown-item">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
