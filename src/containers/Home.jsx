import React, { useState, useEffect, useContext } from 'react';
import Sentence from '../components/Sentence';
import Card from '../components/Card';
import ActionButton from '../components/Button';
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [sentence, setSentence] = useState(null);
    const [sentences, setSentences] = useState([]);
    const [trackIndex, setTrackIndex] = useState(0);

    useEffect(() => {
        if (user) {
            setSentences([
                { isDone: false, text: "The cat is small." },
                { isDone: false, text: "I like to play outside." },
                { isDone: false, text: "The sun is yellow." },
                { isDone: false, text: "Apples are red." },
                { isDone: false, text: "I have a toy car." }
            ]);
        } else {
            setSentences([
                { isDone: false, text: "I like to read story books." },
                { isDone: false, text: "My favorite color is blue." },
                { isDone: false, text: "I have a pet dog named Buddy." },
                { isDone: false, text: "I go to school every day." },
                { isDone: false, text: "I can count to twenty." }
            ]);
        }
    }, [user]);

    useEffect(() => {
        setSentence(sentences[trackIndex]);
    }, [trackIndex, sentences]);

    const onSuccess = () => {
        const updatedSentences = [...sentences];
        updatedSentences[trackIndex].isDone = true;
        setSentences(updatedSentences);
        if (updatedSentences.every(sentence => sentence.isDone)) {
            resetSentences();
        } 
    };

    const resetSentences = () => {
        const resettedSentences = sentences.map(sentence => ({ ...sentence, isDone: false }));
        setSentences(resettedSentences);
        setTrackIndex(0);
        setSentence(resettedSentences[0]);
    };

    const onNext = () => {
        const nextIndex = (trackIndex + 1) % sentences.length;
        setTrackIndex(nextIndex);
    };

    return (
        <>
            <Card title="Practice Speaking" instruction="Try now! Click start button and start speaking the sentence.">
                {sentence && <Sentence onSuccess={onSuccess} sentence={sentence.text} />}
                {sentence?.isDone && (
                    <div>
                        <ActionButton onClick={onNext}>Next</ActionButton>
                    </div>
                )}
            </Card>
        </>
    );
};

export default Home;
