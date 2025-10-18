import React, { useState, useRef } from "react";

const VoiceRecorder = ({ onClose, onResult }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleStart = () => {
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
    recognition.continuous = false; // prevent auto-restart issues
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const speech = Array.from(event.results)
        .map((res) => res[0].transcript)
        .join("");
      setTranscript(speech);
    };

    recognition.onerror = (event) => {
      console.error("Voice Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false); // stop listening when speech ends
    };

    recognition.start();
    setIsListening(true);
  };

  const handleDone = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (transcript.trim()) onResult(transcript);
    setTranscript("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-2">🎤 Speak Now...</h2>
        <p className="text-gray-500 mb-4">
          Voice input is live. Click <strong>Start</strong> to begin speaking,
          then <strong>Done</strong> when finished.
        </p>

        <div className="border rounded p-3 min-h-[60px] bg-gray-100 text-gray-800 font-medium">
          {transcript || "Listening will appear here..."}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {!isListening && (
            <button
              onClick={handleStart}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              🎤 Start
            </button>
          )}
          <button
            onClick={handleDone}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            ✅ Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;
