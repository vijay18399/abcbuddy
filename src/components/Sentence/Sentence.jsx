import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import Word from './Word';
import Feedback from './Feedback';
import {Button} from '../Common';
import { MdMic,MdStopCircle } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import { useAudio } from '../../providers/AudioProvider';

const SentenceContainer = styled.div`
    margin: 10px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;
const InstructionText = styled.div`
    color: #5C5C5C;
    font-weight: 600;
`
const Wrapper = styled.div`
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    border: 2px solid #E5E5E5;
    padding: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 12px;
    align-items: center;
    @media only screen and (max-width: 600px) {
        width: 90%;
    }
`
const WordList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`
const SpeakerIcon = styled.span`
    font-size: 32px;
    color: #1BAFF4;
    cursor: pointer;
`
const ProgressBarContainer = styled.div`
    width: 400px;
    position: relative;
    height: 30px;
    margin: 4px 0px;
    background-color: #eceae8;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    @media only screen and (max-width: 600px) {
        width: 90%;
    }

`;

const ProgressBarInnerContainer = styled.div`
   width: ${(props) => props.$progressValue}%;
   background: ${(props) =>
        props.$progressValue >= 100 ? "#4caf50" : props.$progressValue >= 50 ? "#ff9800" : "#f44336"};
   border-radius: 5px;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: width  0.2s ease-in-out;
   span {
      position: absolute;
      left: 50%;
      top: 10%;
      font-size: 22px;
      font-weight: 700;
   }
`;
const Sentence = ({ sentence, onSuccess, attemptdata }) => {

    const { isListening, isSupported, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
    const [words, setWords] = useState(sentence.split(" ").map((word) => ({ text: word, spoken: false })));
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [timeTracks, setTimeTracks] = useState([]);
    const [attemptData, setAttemptData] = useState(attemptdata);
    const [sentenceState, setSentenceState] = useState(attemptdata ? "SUCCESS" : "IDLE");
    const { playAudio } = useAudio();
    let progress = ((words.filter(word => word.spoken).length / words.length) * 100).toFixed(0);
    console.log(progress, attemptdata)
    const resetSentence = () => {
        setWords(sentence.split(" ").map((word) => ({ text: word, spoken: false })));
        setCurrentWordIndex(null);
        setSentenceState(attemptdata ? "SUCCESS" : "IDLE");
        setTranscript("");
        setTimeTracks([])
    };
    const startSpeaking = () => {
        if (!isSupported) return;
        setTimeTracks([new Date().getTime()]);
        playAudio("START");
        setCurrentWordIndex(0);
        startListening();
        setSentenceState("RECORDING");
    }
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
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
                    setTimeTracks((tt) => {
                        tt[currentWordIndex + 1] = new Date().getTime()
                        return tt
                    })
                    return prevWords.map((wordObj, index) => ({
                        ...wordObj,
                        spoken: index <= currentWordIndex,
                        timeTaken: timeTracks[currentWordIndex + 1] - timeTracks[currentWordIndex]
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
            var data = {
                words: words,
                wpm: Math.round((words.length / ((timeTracks[timeTracks.length - 1] - timeTracks[0]) / 1000)) * 60),
                completedIn: ((timeTracks[timeTracks.length - 1] - timeTracks[0]) / 1000).toFixed(1),
                cwc: words.filter(word => word.spoken).length,
            }
            setAttemptData(data)
            onSuccess && onSuccess(data);
        } else if (!allWordsSpoken && !isListening && sentenceState === "RECORDING") {
            console.log(timeTracks)
            setSentenceState("FAIL");
            playAudio("FAIL");
        }
    }, [words, isListening]);

    return (
        <>
            <SentenceContainer>
                <InstructionText>
                    {sentenceState === "SUCCESS" ? "Great Job" : (sentenceState === "RECORDING" ? "Speak the highlighted Word" : (words.length === 1 ? "Speak The Word" : "Speak The Sentence"))}
                </InstructionText>
                <Wrapper>
                    <WordList>
                        <SpeakerIcon onClick={() => { speakText(sentence) }} >
                             <HiMiniSpeakerWave/>
                        </SpeakerIcon>
                        {words.map((wordObj, index) => (
                            <Word speakText={speakText} key={index} highlight={index === currentWordIndex} sentenceState={sentenceState} text={wordObj.text} spoken={wordObj.spoken} />
                        ))}
                    </WordList>
                </Wrapper>
                {isListening && sentenceState === "RECORDING" && words.length !== 1 && (
                    <ProgressBarContainer>
                        <ProgressBarInnerContainer $progressValue={progress}>
                            {progress && <span>{progress}%</span>}
                        </ProgressBarInnerContainer>
                    </ProgressBarContainer>
                )}
                <ButtonContainer>
                    {!isListening && sentenceState === "IDLE" && (
                        <Button $disabled={!isSupported} onClick={startSpeaking} >
                            {isSupported ? <><MdMic /> Tap to Speak</> : <div>Browser Not Supported</div>}
                        </Button>
                    )}
                    {isListening && sentenceState === "RECORDING" && (
                        <Button onClick={() => { stopListening(); }}>
                            <MdStopCircle /> Stop
                        </Button>
                    )}
                    {sentenceState === "SUCCESS" && (
                        <Feedback attemptData={attemptData} />
                    )}
                    {sentenceState === "FAIL" && (
                        <Button onClick={resetSentence}><FaUndo />Retry</Button>
                    )}
                </ButtonContainer>
            </SentenceContainer>

        </>

    );
};

export default Sentence;
