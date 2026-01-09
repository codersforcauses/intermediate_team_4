import Link from "next/link";

export default function ButtonGoUserSettings() {
  return (
    <Link href="/user_settings">
      <button
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
        Go to User Settings
      </button>
    </Link>
  );
}
