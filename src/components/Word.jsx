import React from 'react';
import styled from 'styled-components';

function getColor(sentenceState, isInSpeech,highlight) {
    if (sentenceState === "RECORDING") {
        return isInSpeech ? "#83B963" :( highlight ? "white" : "#424242");
    } else if (sentenceState === "FAIL") {
        return isInSpeech ? "#83B963" : "#FF5722";
    } else if (sentenceState === "SUCCESS") {
        return "#83B963";
    } else {
        return "#424242";
    }
}
function getBgColor(sentenceState, highlight) {
   if (sentenceState === "RECORDING") {
       return highlight ? "#59AAEC" : "transparent";
   } else {
       return "transparent";
   }
}

const StyledWord = styled.li`
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    padding: 8px;
    border-radius: 10px;
    background-color: ${(props) => getBgColor(props.$sentenceState,props.$highlight) };
    color: ${(props) => getColor(props.$sentenceState, props.$isInSpeech,props.$highlight)};
`;

const Word = ({ text, spoken, sentenceState,speakText, highlight }) => {
    return <StyledWord   onClick={() => speakText(text)} $sentenceState={sentenceState} $isInSpeech={spoken} $highlight={highlight}>{text}</StyledWord>;
};

export default Word;
