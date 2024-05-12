import React ,{useContext} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const Sidebar = styled.div`
  background-color: #2c3e50;
  color: #fff; 
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 15px;
  &:hover {
    background-color: #34495e; 
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2); /* Lighter color for divider */
  margin: 10px 0;
`;
const Container = styled.div`
  margin-left: 250px;
  padding: 20px;
`;
const AdminLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
     <>
         <Sidebar>
      <Nav>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard/word">Words</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard/sentence">Sentences</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard/tongue-twister">Tongue Twisters</NavLink>
        </NavItem>
        <Divider />
        <NavItem>
          <NavLink to="/dashboard/bulk-upload">Bulk Upload</NavLink>
        </NavItem>
        <NavItem onClick={logout} >
          Logout
        </NavItem>
      </Nav>
    </Sidebar>
    <Container>
    <Outlet />
    </Container>
     </>
  );
};

export default AdminLayout;
