import Link from "next/link";

export default function User_Navbar() {
  return (
    <nav
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: "bold", marginRight: "24px" }}>Logo</div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search"
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "240px",
          marginRight: "32px",
        }}
      />

      {/* Nav links */}
      <div style={{ display: "flex", gap: "24px" }}>
        <Link href="/">Home</Link>
        <Link href="#">My Clubs</Link>
        <Link href="#">My Borrowings</Link>
        <Link href="#">Friends</Link>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User avatar */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#5b84b1",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        U
      </div>
    </nav>
  );
}
