import styled from 'styled-components';

const FeedbackContainer = styled.div`
    text-align: center;
`;

const ChipContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const Chip = styled.div`
    position: relative;
    background-color: #43A047;
    color: #ffffff;
    border-radius: 20px;
    padding: 8px;
    padding-left: 30px;
    margin: 0 5px 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

`;

const ChipNumber = styled.span`
    position: absolute;
    left: 2px;
    background-color: #E8F5E9;
    color: #1B5E20;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: 12px;
`;

const Feedback = ({ attemptData }) => {
    const {wpm,completedIn,cwc}  = attemptData;
    return (
        <FeedbackContainer>
            <ChipContainer>
                <Chip>
                    <ChipNumber>{wpm}</ChipNumber> WPM
                </Chip>
                <Chip>
                    <ChipNumber>{completedIn}</ChipNumber> Seconds
                </Chip>
                <Chip>
                    <ChipNumber>{cwc}</ChipNumber> Correct
                </Chip>
            </ChipContainer>
        </FeedbackContainer>
    );
};

export default Feedback;
