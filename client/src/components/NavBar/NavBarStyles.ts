import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #2575fc;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  margin: 0 1rem;
  transition: color 0.3s;

  &:hover {
    color: #ffcc00;
  }
`;

export const LogoutButton = styled.button`
  background-color: #ff4b2b;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6f47;
  }
`;

export const UserEmail = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 1rem;
  color: #ffffff;
`;
