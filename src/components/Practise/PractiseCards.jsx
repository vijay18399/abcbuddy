import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {BreadCrumb} from "../Common";

const PractiseCardContainer = styled.div`
    width: 100%;
    min-height: calc(100svh - 164px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const CardLink = styled(Link)`
  width: 240px;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 5px;
  transition: transform 0.2s;
  text-align: center;
  padding: 15px;
  box-shadow: 0 4px rgba(229, 229, 229, 0.75);
  background-color: #ffffff;
  color: #1baff4;
  border: 1px solid rgb(229, 229, 229);
  &:hover {
    transform: scale(1.05);
  }
`;


const PractiseCards = () => {
  return (
    <>
      <BreadCrumb pagetitle="I want to practise..." />
      <PractiseCardContainer>
        <CardContainer>
          <CardLink to="word"> Words</CardLink>
          <CardLink to="sentence">Sentences</CardLink>
        </CardContainer>
      </PractiseCardContainer>
    </>
  );
};

export default PractiseCards;
