import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
const CardContainer = styled.div`
     display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 260px;
    height: 100%;
    height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: 16px double black;
    cursor: pointer;
    transition: transform 0.3s ease;
    background-color: ${(props) => props.color};
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  color: black;
  background-color: aliceblue;
  text-decoration: none;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PracticeCards = () => {
  return (
    <CardContainer>
   
      <Card color="#2b91e5">
        <StyledLink to="word">Words</StyledLink>
      </Card>
      <Card color="#f4ca32">
        <StyledLink to="sentence">Sentences</StyledLink>
      </Card>
      <Card color="#F5606B">
        <StyledLink to="tongue-twister">Tongue Twisters</StyledLink>
      </Card>
    </CardContainer>
  );
};

export default PracticeCards;
