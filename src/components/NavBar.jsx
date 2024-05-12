import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ABCBuddyLogo from "../assets/images/abcBuddy.png";
import { AuthContext } from "../providers/AuthProvider";
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(239, 243, 244);
  overflow-x: hidden;
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #6d6e70;
  img {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const NavLinks = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
  li {
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: #260e45;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
  &.active {
    font-weight: bold;
  }
`;

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Nav>
      <BrandLink to="/">
        <img src={ABCBuddyLogo} alt="logo" className="icon" />
        <span>ABC Buddy</span>
      </BrandLink>
      <NavLinks>
        
        {!user ? (
          <>
            <li>
              <StyledLink to="/auth">Login</StyledLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <StyledLink to="/practice">Practice</StyledLink>
            </li>
            <li>
              <StyledLink to="/practice-list">Create List</StyledLink>
            </li>
            <li>
              <StyledLink to="/" onClick={logout}>
                Logout
              </StyledLink>
            </li>
          </>
        )}
        <li>

        </li>
      </NavLinks>
    </Nav>
  );
}
