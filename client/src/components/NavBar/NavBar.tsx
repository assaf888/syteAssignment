import React from 'react';
import { Nav, NavLink, LogoutButton, UserEmail } from './NavBarStyles';

interface NavbarProps {
  onLogout: () => void;
  isAuthenticated: boolean;
  userEmail: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, isAuthenticated, userEmail }) => (
  <Nav>
    {isAuthenticated ? (
      <>
        <UserEmail>Welcome {userEmail}</UserEmail>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </>
    ) : (
      <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    )}
    <NavLink to="/catalogs">Catalogs</NavLink>
  </Nav>
);

export default Navbar;
