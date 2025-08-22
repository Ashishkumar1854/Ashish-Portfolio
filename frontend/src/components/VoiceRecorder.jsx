import React, { useState, useEffect, useRef } from "react";

const VoiceRecorder = ({ onClose, onResult }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // 🎙️ 1. Web Speech API - SpeechRecognition (Voice to Text)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      onClose();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const speech = Array.from(event.results)
        .map((res) => res[0].transcript)
        .join("");
      setTranscript(speech);
    };

    recognition.onerror = (event) => {
      console.error("Voice Error:", event.error);
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognition.start(); // 🟢 Start listening
    setIsListening(true);

    return () => {
      recognition.stop(); // 🛑 Stop on unmount
    };
  }, [onClose]);

  const handleDone = () => {
    // 🔇 Stop listening
    recognitionRef.current?.stop();
    setIsListening(false);

    // 📢 2. Web Speech API - SpeechSynthesis (Text to Voice)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.lang = "en-US";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser.");
    }

    // 📤 Send result to parent
    onResult(transcript);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
        <h2 className="text-xl font-bold mb-2">🎤 Speak Now...</h2>
        <p className="text-gray-500 mb-4">
          Voice input is live. Click <strong>Done</strong> to send and hear
          back.
        </p>

        <div className="border rounded p-3 min-h-[60px] bg-gray-100 text-gray-800 font-medium">
          {transcript || "Listening..."}
        </div>

        <button
          onClick={handleDone}
          className="mt-5 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          ✅ Done
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
