// src/components/Header.tsx (No changes needed, just a review)

const Header = () => {
  return (
    <header className="app-header">
      {" "}
      {/* <--- Class 1 */}
      {/* Left side: Logo */}
      <div className="header-logo">
        {" "}
        {/* <--- Class 3 */}
        <span>Logo</span>
      </div>
      {/* Center: Navigation Links */}
      <nav className="header-nav">
        {" "}
        {/* <--- Class 2 */}
        <ul>
          <li>Home</li>
          <li>Activity</li>
          <li>Management</li>
        </ul>
      </nav>
      {/* Right side: User Profile */}
      <div className="header-user">
        {" "}
        {/* <--- Class 4 */}
        {/* User avatar and name */}
        <div className="user-avatar-placeholder"></div> {/* <--- Class 5 */}
        <span>User</span>
      </div>
    </header>
  );
};

export default Header;
