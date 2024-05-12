import React, { createContext, useContext, useState } from 'react';
import greatJobAudio from '../assets/audios/great-job.mp3';
import errorAudio from '../assets/audios/error.mp3';
import startAudio from '../assets/audios/start.mp3';
const stateAudioMap = {
    "SUCCESS": greatJobAudio,
    "FAIL": errorAudio,
    "START": startAudio
};
const AudioContext = createContext();

export const useAudio = () => {
    return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const playAudio = (state) => {
        if (!isMuted) {
            const audio = new Audio(stateAudioMap[state]);
            audio.play();
        }
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute, playAudio }}>
            {children}
        </AudioContext.Provider>
    );
};
