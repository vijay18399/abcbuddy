import styled from "styled-components";
const StyledCard = styled.div`
    min-width: 400px;
    margin: 20px;
    border-radius: 11px;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    background-color: #f6f6f6;
    background: radial-gradient(128.42% 48.36% at 72.89% 25.8%, rgba(200, 221, 218, 0) 0, rgba(200, 221, 218, .4) 100%);
    box-shadow: 0 4px rgba(191, 222, 218, .75);
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Heading = styled.h2`
    color: #0D47A1;
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 16px;
`;

const Instructions = styled.p`
    color: #536471;
    font-size: 18px;
    margin-bottom: 20px;
`;
const Card = ({ children , title, instruction }) => {
    return <StyledCard>
        <Heading>{title}</Heading>
        <Instructions>{instruction}</Instructions>
        {children}
    </StyledCard>
}
export default Card