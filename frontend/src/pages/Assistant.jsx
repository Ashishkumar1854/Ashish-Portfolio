import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import VoiceRecorder from "../components/VoiceRecorder";
import HireForm from "../pages/HireForm";

const AssistantPage = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (!selectedVoice && availableVoices.length) {
        const defaultVoice = availableVoices.find((v) =>
          v.name.toLowerCase().includes("male")
        );
        setSelectedVoice(defaultVoice || availableVoices[0]);
      }
    };
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
    loadVoices();
  }, [selectedVoice]);

  const speak = (text) => {
    if (!isMuted && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.lang = "en-US";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const timestamp = new Date().toISOString();
    const userMsg = { sender: "user", text: input, timestamp };
    const botMsg = {
      sender: "bot",
      text: "🧠 I'm still learning! How can I assist you?",
      timestamp,
    };
    setChat((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    speak(botMsg.text);
  };

  const handleVoiceResult = (text) => {
    const timestamp = new Date().toISOString();
    const userMsg = { sender: "user", text, timestamp };
    const botMsg = {
      sender: "bot",
      text: "🧠 Great! I received your voice message.",
      timestamp,
    };
    setChat((prev) => [...prev, userMsg, botMsg]);
    speak(botMsg.text);
  };

  const handleClear = () => setChat([]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Push content below navbar */}
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 mt-[80px] flex flex-col h-[calc(100vh-80px)]">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Ashish Assistant 🤖
        </h2>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col gap-3 p-3 sm:p-4 bg-white rounded-2xl shadow-lg border overflow-y-auto">
          {chat.map((msg, idx) => (
            <ChatBubble
              key={idx}
              sender={msg.sender}
              message={msg.text}
              timestamp={msg.timestamp}
              isUser={msg.sender === "user"}
              onDelete={() =>
                setChat((prev) => prev.filter((_, i) => i !== idx))
              }
              onEdit={(newText) =>
                setChat((prev) =>
                  prev.map((m, i) => (i === idx ? { ...m, text: newText } : m))
                )
              }
            />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Section */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 border p-2 sm:p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition w-full sm:w-auto"
            onClick={handleSend}
          >
            Send
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 sm:mt-4 text-center flex flex-wrap justify-center gap-2">
          <button
            className="bg-yellow-400 text-black px-4 sm:px-5 py-2 rounded-xl hover:bg-yellow-500 transition w-full sm:w-auto"
            onClick={() => setIsVoiceOpen(true)}
          >
            🗣️ Talk to Me
          </button>

          <button
            className="bg-green-500 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-green-600 transition w-full sm:w-auto"
            onClick={() => setIsHireOpen(true)}
          >
            💼 Hire Freelancer
          </button>

          <button
            className="bg-gray-500 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-600 transition w-full sm:w-auto"
            onClick={handleClear}
          >
            🔁 Clear Chat
          </button>
        </div>

        {/* Voice Settings */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className={`px-4 py-2 rounded-xl text-white transition w-full sm:w-auto ${
              isMuted ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isMuted ? "🔇 Voice Muted" : "🔊 Voice On"}
          </button>

          <select
            value={selectedVoice?.name}
            onChange={(e) =>
              setSelectedVoice(voices.find((v) => v.name === e.target.value))
            }
            className="border p-2 rounded w-full sm:w-auto max-w-xs"
          >
            {voices.map((voice, i) => (
              <option key={i} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modals */}
      {isVoiceOpen && (
        <VoiceRecorder
          onClose={() => setIsVoiceOpen(false)}
          onResult={(text) => {
            handleVoiceResult(text);
            setIsVoiceOpen(false);
          }}
        />
      )}
      {isHireOpen && <HireForm onClose={() => setIsHireOpen(false)} />}
    </div>
  );
};

export default AssistantPage;
