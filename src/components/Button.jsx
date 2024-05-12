import styled, { css } from "styled-components";

const Button = styled.button`
    background-color: #41b14f;
    background-image: linear-gradient(#9ec14c, #41b14f);
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
    box-shadow: 0 4px #2d8f39;
    border: none;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border-radius: 10px;
    padding: 8px;
    font-size: 18px;
    svg {
        margin-left: 10px;
    }

    &:hover {
        background-color: ${({ disabled }) => (disabled ? "#41b14f" : "#36a745")};
        background-image: ${({ disabled }) => (disabled ? "none" : "linear-gradient(#80e27e, #36a745)")};
        box-shadow: ${({ disabled }) => (disabled ? "0 4px #2d8f39" : "0 4px #27803e")};
    }

    &:focus {
        outline: none;
    }

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}
`;

const ActionButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export default ActionButton;
