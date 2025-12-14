import Head from "next/head";
import { useState } from "react";

import Navbar from "../components/ui/user_navbar";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  return (
    <>
      <Head>
        <title>User Settings</title>
      </Head>

      <Navbar />

      <div
        style={{
          backgroundColor: "#e6e6e6",
          minHeight: "100vh",
          paddingTop: "64px",
          paddingBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Main container */}
        <div
          style={{
            display: "flex",
            width: "1000px",
            marginTop: "30px",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "200px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              height: "fit-content",
              gap: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              onClick={() => setActiveTab("profile")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "profile" ? "bold" : "normal",
              }}
            >
              Profile
            </div>

            <div
              onClick={() => setActiveTab("notifications")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "notifications" ? "bold" : "normal",
              }}
            >
              Notifications
            </div>

            <div
              onClick={() => setActiveTab("security")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "security" ? "bold" : "normal",
              }}
            >
              Security
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </div>
      </div>
    </>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
}

function Input({
  placeholder,
  full = false,
}: {
  placeholder: string;
  full?: boolean;
}) {
  return (
    <input
      placeholder={placeholder}
      style={{
        width: full ? "100%" : "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#f1f1f1",
      }}
    />
  );
}

function ProfileTab() {
  return (
    <>
      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "#5b84b1",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          U
        </div>

        <div>
          <h2 style={{ marginBottom: "4px" }}>New User</h2>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Member since December 2025
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ marginTop: "32px" }}>
        <FormRow>
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
        </FormRow>

        <FormRow>
          <Input placeholder="Date of Birth" />
          <Input placeholder="Phone number" />
        </FormRow>

        <div style={{ marginBottom: "20px" }}>
          <Input placeholder="Email address" full />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Input placeholder="Address" full />
        </div>

        <button
          style={{
            marginTop: "24px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#e6e6e6",
            cursor: "pointer",
          }}
        >
          Save changes
        </button>
      </div>
    </>
  );
}

function SecurityTab() {
  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Password</h2>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="password"
          placeholder="Current password"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <input type="password" placeholder="New password" style={inputStyle} />
      </div>

      <div style={{ marginBottom: "6px" }}>
        <input
          type="password"
          placeholder="Confirm new password"
          style={inputStyle}
        />
      </div>

      <p style={{ fontSize: "15px", color: "#777", marginBottom: "24px" }}>
        At least 8 characters
      </p>

      <button style={primaryButtonStyle}>Change password</button>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Notifications</h2>

      <div style={notificationHeaderStyle}>
        <span></span>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <strong>Email</strong>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <strong>Mobile</strong>
        </div>
      </div>

      {["Inbox messages", "Order messages", "Promotions", "Updates"].map(
        (label) => (
          <div key={label} style={notificationRowStyle}>
            <span>{label}</span>
            <input type="checkbox" />
            <input type="checkbox" />
          </div>
        ),
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#f2f2f2",
  fontSize: "16px",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#e6e6e6",
  cursor: "pointer",
  fontSize: "16px",
};

const notificationHeaderStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 80px 80px",
  paddingBottom: "8px",
  borderBottom: "1px solid #ccc",
  marginBottom: "12px",
};

const notificationRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 80px 80px",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};
