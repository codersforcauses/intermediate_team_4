// this is the path to this page
// src/pages/index.tsx

import ButtonGoOrganizationDashboard from "../components/ui/button_go_organization_dashboard";
import ButtonGoUserDashboard from "../components/ui/button_go_user_dashboard";
import ButtonGoUserProfilePage from "../components/ui/button_go_user_profile_page";
import ButtonGoUserSettings from "../components/ui/button_go_user_settings";

// this is a react functional component
// it returns a html element that will render the jsx inside it
const LandingPage = () => {
  return (
    <div
      // Simple inline styles for centering content
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Welcome to the Inventory Management System</h1>
      <p>This is the main landing page for your application.</p>

      {/* The Next.js Link component handles navigation. 
        href="/dashboard" will take us to the page we just renamed.
      */}

      <ButtonGoOrganizationDashboard />
      <ButtonGoUserDashboard />
      <ButtonGoUserProfilePage />
      <ButtonGoUserSettings />
    </div>
  );
};

export default LandingPage;
