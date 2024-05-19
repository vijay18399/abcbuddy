import React from 'react';
import styled, { keyframes } from 'styled-components';
const colorA = '#59AAEC';
const colorB = '#ffd166';
const colorC = '#F5606B';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const SquareContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  animation: ${rotate} 2s linear infinite;
`;

const SquareBox = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px double black;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  animation: ${rotateReverse} 2s linear infinite;
  span{
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <SquareContainer>
        <SquareBox color={colorA} ><span>A</span></SquareBox>
        <SquareBox color={colorB} ><span>B</span></SquareBox>
        <SquareBox color={colorC} ><span>C</span></SquareBox>
      </SquareContainer>
    </LoaderContainer>
  );
};

export default Loader;