import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const BreadcrumbContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 0 10px;
  span{
    color:#6d6e70;
  }
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #6d6e70;
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  color: #6d6e70;
  font-size: 24px;
  text-align: center;
  margin: 10px 0 0;
`;

const Breadcrumb = ({ pagetitle }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">
            <IoMdHome  color='#6d6e70' size={24} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.length > 0 && <IoIosArrowForward color='#6d6e70' size={20} />}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <BreadcrumbItem key={to}>
              {isLast ? (
                <span>{value}</span>
              ) : (
                <BreadcrumbLink to={to}>{value}</BreadcrumbLink>
              )}
              {!isLast && <IoIosArrowForward size={20} color='#6d6e70' />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
      <PageTitle>{pagetitle || "No Page"}</PageTitle>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
