import styled from "styled-components";

const Button = styled.button`
    background-color: ${(props) =>{  return (props.$disabled ? "#ea5f69":"white")   }  };
    color: ${(props) =>{  return (props.$disabled ? "white":"#1BAFF4")   }  };
    border: 1px solid rgb(229, 229, 229);
    border-radius: 10px;
    padding: 8px;
    font-size: 18px;
    box-shadow: 0 4px rgba(229, 229, 229, .75);
    padding: 10px;
    cursor: pointer;
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export default StyledButton;
