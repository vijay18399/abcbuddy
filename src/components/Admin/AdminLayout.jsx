import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../providers/AuthProvider';

const Sidebar = styled.div`
  background-color: #3C3C43;
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
  margin: 12px;
`;

const NavItem = styled.li`
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 4px;
  &:hover {
    background-color: #535358; 
  }
`;

const NavButton = styled.li`
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 4px;
  background-color: #E53371;
  cursor: pointer;
  &:hover {
    background-color: #d32f5f;
  }
`;

const NavLinkStyled = styled(Link)`
  display: block;
  width: 100%;
  color: #fff;
  text-decoration: none;
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0;
`;

const Container = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <>
      <Sidebar>
        <Nav>
          <NavItem>
            <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/dashboard/word">Words</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/dashboard/sentence">Sentences</NavLinkStyled>
          </NavItem>
          <Divider />
          <NavItem>
            <NavLinkStyled to="/dashboard/bulk-upload">Bulk Upload</NavLinkStyled>
          </NavItem>
          <NavButton onClick={logout}>
            Logout
          </NavButton>
        </Nav>
      </Sidebar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
