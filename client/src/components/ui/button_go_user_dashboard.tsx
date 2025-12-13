// src/components/ui/button_go_user_dashboard.tsx

/* 
This is the button component that will take us to the organization dashboard page
Copy this function into its own file so it can be reused in multiple places
*/

// Next.js uses the Link component for client-side navigation
// better and faster then <a> tags.
import Link from "next/link";
import React from "react";

/* 
legacyBehavior is used to enable the older behavior of Link component 
we dont actually need to have an <a> tag inside Link cause Link itself can handle it,
but for styling purposes we are using it here
*/
const ButtonGoUserDashboard = () => {
  return (
    // Change the href to match the new page name, the name is based on the file name
    // example: organization_dashboard.tsx -> /organization_dashboard
    <Link href="/user_dashboard" legacyBehavior>
      <a
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
          fontSize: "1.1em",
        }}
      >
        Go to User Dashboard
      </a>
    </Link>
  );
};

// Use default export so it can be easily imported into the page
export default ButtonGoUserDashboard;
