import React, { useState, useEffect } from 'react';
import Sentence from '../Sentence/Sentence';
import {Button} from '../Common';
import styled from 'styled-components';
const Container = styled.div`
    min-height: calc(100vh - 61px);
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Home = () => {
    const [sentence, setSentence] = useState(null);
    const [sentences, setSentences] = useState([
        { isDone: false, text: "All is well" },
        { isDone: false, text: "I like to play outside." },
        { isDone: false, text: "The sun is yellow." },
        { isDone: false, text: "Apples are red." },
        { isDone: false, text: "I have a toy car." },
        { isDone: false, text: "I like to read story books." },
        { isDone: false, text: "My favorite color is blue." },
        { isDone: false, text: "I have a pet dog named Buddy." },
        { isDone: false, text: "I go to school every day." },
        { isDone: false, text: "I can count to twenty." }
    ]);
    const [trackIndex, setTrackIndex] = useState(0);
    useEffect(() => {
        setSentence(sentences[trackIndex]);
    }, [trackIndex, sentences]);

    const onSuccess = () => {
        const updatedSentences = [...sentences];
        updatedSentences[trackIndex].isDone = true;
        setSentences(updatedSentences);
    };

    const resetSentences = () => {
        const resettedSentences = sentences.map(sentence => ({ ...sentence, isDone: false }));
        setSentences(resettedSentences);
        setTrackIndex(0);
        setSentence(resettedSentences[0]);
    };

    const onNext = () => {
        const updatedSentences = [...sentences];
        if (updatedSentences.every(sentence => sentence.isDone)) {
            resetSentences();
        }else{
            const nextIndex = (trackIndex + 1) % sentences.length;
            setTrackIndex(nextIndex);
        }
       
    };

    return (
        <Container>
            {sentence && <Sentence onSuccess={onSuccess} sentence={sentence.text} />}
            {sentence?.isDone && (
                <Button onClick={onNext} >
                    Next
                </Button>
            )}
        </Container>
    );
};

export default Home;
