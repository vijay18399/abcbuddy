import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
    {
      setIsSupported(false);
      return;
    }
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = 'en-US';

    newRecognition.onstart = () => {
      setIsListening(true);
    };

    newRecognition.onresult = (event) => {
      console.log(event.results)
      const lastIndex = event.results.length - 1;
      const transcript = event.results[lastIndex][0].transcript;
      console.log(transcript)
      setTranscript(transcript);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);

    return () => {
      newRecognition.stop();
    };
  }, []);

  const startListening = () => {
    recognition.start();
    setTranscript("")
  };

  const stopListening = () => {
    recognition.stop();
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    setTranscript,
  };
};

export default useSpeechRecognition;