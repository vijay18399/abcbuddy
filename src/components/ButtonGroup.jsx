import React from 'react';
import styled, { keyframes } from 'styled-components';
import ActionButton from './Button';
import { FaRegThumbsUp } from "react-icons/fa";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`;

const IconDiv = styled.span`
    width: 20px;
    height: 20px;
    font-size: 20px;
    background-color: #ffffff;
    color: #388E3C;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    span {
        margin-right: 10px;
    }
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(15deg);
    }
    50% {
        transform: rotate(-15deg);
    }
    75% {
        transform: rotate(15deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const ThumbsUpIcon = styled(FaRegThumbsUp)`
    animation: ${rotate} 1s linear ;
`;

const ButtonGroup = ({ isListening, state, startListening, stopListening, reset }) => {
    return (
        <Wrapper>
            {!isListening && state === "IDLE" && (
                <ActionButton onClick={startListening}>Start</ActionButton>
            )}
            {isListening && state === "RECORDING" && (
                <ActionButton onClick={() => { stopListening(); }}>Stop</ActionButton>
            )}
            {state === "SUCCESS" && (
                <IconDiv>
                    <ThumbsUpIcon />
                </IconDiv>
            )}
            {state === "FAIL" && (
                <ActionButton onClick={reset}>Retry</ActionButton>
            )}
        </Wrapper>
    );
};

export default ButtonGroup;
