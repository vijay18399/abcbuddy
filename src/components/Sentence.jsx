import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonGroup from './ButtonGroup';
import Word from './Word';
import WordList from './WordList';
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { useAudio } from '../providers/AudioProvider';

const Container = styled.div`
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        width: 90%;
    }
`;
const Wrapper = styled.div`
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid rgb(185, 202, 211);
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`
const Transcript = styled.p`
   background: white;
    text-align: center;
    font-size: 16px;
    margin: 12px;
    padding: 7px 14px;
    color: #536471;
    border-radius: 23px;
    word-wrap: break-word;
    max-width: 100%;
    visibility: ${props => props.$visible ? 'visible' : 'hidden'};
`;

const ReadButton = styled.button`
    background-color: #0D47A1;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    border: 0px;
`;

const Sentence = ({ sentence, onSuccess,isAttempted }) => {
    const { isListening, startListening, stopListening, transcript, setTranscript } = useSpeechRecognition();
    const [words, setWords] = useState(sentence.split(" ").map((word) => ({ text: word, spoken: false })));
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [timeTracks, setTimeTracks] = useState([]);
    const [sentenceState, setSentenceState] = useState("IDLE");
    const { playAudio } = useAudio();

    const resetSentence = () => {
        setWords(sentence.split(" ").map((word) => ({ text: word, spoken: false })));
        setCurrentWordIndex(null);
        setSentenceState("IDLE");
        setTranscript("");
        setTimeTracks([])
    };
    const speakText=(text)=>{
        if(sentenceState==="IDLE"){
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    }
    const cleanText = (text) => {
        return text.replace(/[^\w\s]/gi, '').toLowerCase();
    };

    useEffect(() => {
        resetSentence();
    }, [sentence]);

    useEffect(() => {
        if (transcript.trim() !== "" && isListening) {
            const transcriptWords = transcript.trim().split(" ").map(word => word.toLowerCase());
            const currentWord = words[currentWordIndex];
            if (currentWord && !currentWord.spoken && transcriptWords.includes(cleanText(currentWord.text))) {
                setWords(prevWords => {
                    setTimeTracks((tt)=>{
                        tt[currentWordIndex+1]=new Date().getTime()
                        return tt
                    })
                    return prevWords.map((wordObj, index) => ({
                        ...wordObj,
                        spoken: index <= currentWordIndex,
                        timeTaken: timeTracks[currentWordIndex+1]-timeTracks[currentWordIndex]
                    }));
                });
                setCurrentWordIndex(prevIndex => prevIndex + 1);
            }
        }
    }, [transcript, currentWordIndex, isListening]);

    useEffect(() => {
        const allWordsSpoken = words.every((wordObj) => wordObj.spoken);
        if (allWordsSpoken && isListening && sentenceState !== "SUCCESS") {
            console.log(timeTracks)
            stopListening();
            setSentenceState("SUCCESS");
            playAudio("SUCCESS");
            onSuccess && onSuccess(
                {
                    words: words,
                    wpm :Math.round((words.length / ((timeTracks[timeTracks.length - 1] - timeTracks[0]) / 1000))*60),
                    completedIn:((timeTracks[timeTracks.length - 1] - timeTracks[0]) / 1000).toFixed(1)               
                }
            );
        } else if (!allWordsSpoken && !isListening && sentenceState === "RECORDING") {
            console.log(timeTracks)
            setSentenceState("FAIL");
            playAudio("FAIL");
        }
    }, [words, isListening]);

    return (
        <Container>
            <Wrapper>
                <WordList>
                    {words.map((wordObj, index) => (
                        <Word  speakText={speakText}  key={index}  highlight={index===currentWordIndex} sentenceState={sentenceState} text={wordObj.text} spoken={wordObj.spoken} />
                    ))}
                </WordList>
                <ButtonGroup
                    isListening={isListening}
                    state={sentenceState}
                    startListening={() => { setTimeTracks([new Date().getTime()]); playAudio("START");  setCurrentWordIndex(0); startListening(); setSentenceState("RECORDING"); }}
                    stopListening={() => { stopListening(); }}
                    reset={resetSentence}
                    isAttempted={isAttempted}
                />
            </Wrapper>
            {sentenceState === "IDLE" && <ReadButton onClick={() => speakText(sentence)}>Read It</ReadButton>}
            {/* <Transcript $visible={transcript}>{transcript}</Transcript> */}
        </Container>
    );
};

export default Sentence;
