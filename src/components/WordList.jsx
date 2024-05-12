import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const WordList = ({ children }) => {
  return <List>{children}</List>;
};

export default WordList;
