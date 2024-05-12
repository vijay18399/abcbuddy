import styled from 'styled-components';

const FeedbackContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #ededed;
`;

const WordList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const ChipContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const Chip = styled.div`
        position: relative;
    background-color: #ff8c00;
    color: #ffffff;
    border-radius: 20px;
    padding: 8px 16px;
    padding-left: 35px;
    margin: 0 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

`;

const WordItem = styled.span`
    color: ${props => (props.spoken ? '#228708' : '#b84014')};
    background-color: ${props => (props.spoken ? '#c7efc7' : '#f7d7d7')};
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
    font-size: 28px;
`;



const ChipNumber = styled.span`
    position: absolute;
    left: 2px;
    background-color: #ffffff;
    color: #000000;
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
    const { wpm, completedIn, words } = attemptData;
    const correctWordsCount = words.filter(word => word.spoken).length;

    return (
        <FeedbackContainer>
            <WordList>
                {words.map((word, index) => (
                    <WordItem key={index} spoken={word.spoken}>
                        {word.text}
                    </WordItem>
                ))}
            </WordList>
            <ChipContainer>
                <Chip>
                    <ChipNumber>{wpm}</ChipNumber> WPM
                </Chip>
                <Chip>
                    <ChipNumber>{completedIn}</ChipNumber> Seconds
                </Chip>
                <Chip>
                    <ChipNumber>{correctWordsCount}</ChipNumber> Correct
                </Chip>
            </ChipContainer>
        </FeedbackContainer>
    );
};

export default Feedback;
