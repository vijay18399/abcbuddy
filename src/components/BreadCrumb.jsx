import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    font-size: 16px;
    margin: 14px;
    display: flex;
    justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
`;

const BreadCrumb = ({ items }) => {
    return (
      <Wrapper>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.isCurrent ? (
              <span>{item.label}</span>
            ) : (
              <StyledLink to={item.url}>{item.label}</StyledLink>
            )}
            {index !== items.length - 1 && <Separator>/</Separator>}
          </React.Fragment>
        ))}
      </Wrapper>
    );
  };
  

export default BreadCrumb;
