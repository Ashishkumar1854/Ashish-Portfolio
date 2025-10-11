// import React, { useState, useEffect, useRef } from "react";
// import ChatBubble from "../components/ChatBubble";
// import TimelineCard from "../components/TimelineCard";
// import VoiceRecorder from "../components/VoiceRecorder";
// import HireForm from "../pages/HireForm";
// import { useAssistantLogic } from "../hooks/useAssistantLogic";

// const AssistantPage = () => {
//   const [chat, setChat] = useState([]);
//   const [input, setInput] = useState("");
//   const [isVoiceOpen, setIsVoiceOpen] = useState(false);
//   const [isHireOpen, setIsHireOpen] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const {
//     getBotReply,
//     isHireTriggered,
//     setIsHireTriggered,
//     suggestedOptions,
//     setSuggestedOptions,
//   } = useAssistantLogic();

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chat]);

//   useEffect(() => {
//     const synth = window.speechSynthesis;
//     const loadVoices = () => {
//       const availableVoices = synth.getVoices();
//       setVoices(availableVoices);
//       if (!selectedVoice && availableVoices.length) {
//         const defaultVoice = availableVoices.find((v) =>
//           v.name.toLowerCase().includes("male")
//         );
//         setSelectedVoice(defaultVoice || availableVoices[0]);
//       }
//     };
//     if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
//     loadVoices();
//   }, [selectedVoice]);

//   const speak = (text) => {
//     if (!isMuted && "speechSynthesis" in window) {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.voice = selectedVoice;
//       utter.lang = "en-US";
//       utter.rate = 1;
//       window.speechSynthesis.speak(utter);
//     }
//   };

//   const handleSend = async (msg = null) => {
//     const messageText = msg || input;
//     if (!messageText.trim()) return;

//     const timestamp = new Date().toISOString();
//     const userMsg = { sender: "user", text: messageText, timestamp };
//     setChat((prev) => [...prev, userMsg]);
//     setInput("");

//     const botText = await getBotReply(messageText);
//     const botMsg = { sender: "bot", text: botText, timestamp };
//     setChat((prev) => [...prev, botMsg]);
//     speak(botText);

//     if (isHireTriggered) {
//       setIsHireOpen(true);
//       setIsHireTriggered(false);
//     }

//     setTimeout(() => scrollToBottom(), 50);
//   };

//   const handleVoiceResult = async (text) => await handleSend(text);
//   const handleClear = () => {
//     setChat([]);
//     setSuggestedOptions([]);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col pt-20">
//       {/* Assistant Container */}
//       <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 relative">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">
//           Ashish Assistant 🤖
//         </h2>

//         {/* Chat Box with Scroll */}
//         <div
//           ref={chatContainerRef}
//           className="flex-1 flex flex-col gap-3 p-3 sm:p-4 bg-white rounded-2xl shadow-lg border overflow-y-auto"
//           style={{ maxHeight: "60vh" }}
//         >
//           {chat.map((msg, idx) =>
//             msg.sender === "user" ? (
//               <ChatBubble
//                 key={idx}
//                 sender={msg.sender}
//                 message={msg.text}
//                 timestamp={msg.timestamp}
//                 isUser
//                 onDelete={() =>
//                   setChat((prev) => prev.filter((_, i) => i !== idx))
//                 }
//                 onEdit={(newText) =>
//                   setChat((prev) =>
//                     prev.map((m, i) =>
//                       i === idx ? { ...m, text: newText } : m
//                     )
//                   )
//                 }
//               />
//             ) : (
//               <TimelineCard
//                 key={idx}
//                 title="Ashish Assistant"
//                 description={msg.text}
//                 timestamp={msg.timestamp}
//                 isUser={false}
//               />
//             )
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Suggested Options */}
//         {suggestedOptions.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-2 mt-2">
//             {suggestedOptions.map((opt, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleSend(opt)}
//                 className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm sm:text-base hover:bg-indigo-600 transition"
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Input + Action Buttons Fixed at Bottom */}
//         <div className="mt-2 sm:mt-3 flex flex-col gap-2 sticky bottom-0 bg-gray-50 p-2 rounded-t-xl shadow-inner">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               className="flex-1 border p-2 sm:p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition w-full sm:w-auto"
//               onClick={() => handleSend()}
//             >
//               Send
//             </button>
//           </div>

//           <div className="text-center flex flex-wrap justify-center gap-2 mt-2">
//             <button
//               className="bg-yellow-400 text-black px-4 sm:px-5 py-2 rounded-xl hover:bg-yellow-500 transition w-full sm:w-auto"
//               onClick={() => setIsVoiceOpen(true)}
//             >
//               🗣️ Talk to Me
//             </button>

//             <button
//               className="bg-green-500 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-green-600 transition w-full sm:w-auto"
//               onClick={() => setIsHireOpen(true)}
//             >
//               💼 Hire Freelancer
//             </button>

//             <button
//               className="bg-gray-500 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-600 transition w-full sm:w-auto"
//               onClick={handleClear}
//             >
//               🔁 Clear Chat
//             </button>
//           </div>

//           {/* Voice Controls */}
//           <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row gap-2 items-center justify-center">
//             <button
//               onClick={() => setIsMuted((prev) => !prev)}
//               className={`px-4 py-2 rounded-xl text-white transition w-full sm:w-auto ${
//                 isMuted ? "bg-red-500" : "bg-green-500"
//               }`}
//             >
//               {isMuted ? "🔇 Voice Muted" : "🔊 Voice On"}
//             </button>

//             <select
//               value={selectedVoice?.name}
//               onChange={(e) =>
//                 setSelectedVoice(voices.find((v) => v.name === e.target.value))
//               }
//               className="border p-2 rounded w-full sm:w-auto max-w-xs"
//             >
//               {voices.map((voice, i) => (
//                 <option key={i} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {isVoiceOpen && (
//         <VoiceRecorder
//           onClose={() => setIsVoiceOpen(false)}
//           onResult={handleVoiceResult}
//         />
//       )}
//       {isHireOpen && <HireForm onClose={() => setIsHireOpen(false)} />}
//     </div>
//   );
// };

// export default AssistantPage;

import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import TimelineCard from "../components/TimelineCard";
import VoiceRecorder from "../components/VoiceRecorder";
import HireForm from "../pages/HireForm";
import { useAssistantLogic } from "../hooks/useAssistantLogic";

const Assistant = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const chatEndRef = useRef(null);

  const {
    getBotReply,
    isHireTriggered,
    setIsHireTriggered,
    suggestedOptions,
    setSuggestedOptions,
  } = useAssistantLogic();

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

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
    if (!isMuted && "speechSynthesis" in window && text) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = selectedVoice;
      utter.lang = "en-US";
      utter.rate = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  const handleSend = async (msg = null) => {
    const messageText = msg || input;
    if (!messageText.trim()) return;
    const timestamp = new Date().toISOString();

    const userMsg = { sender: "user", text: messageText, timestamp };
    setChat((prev) => [...prev, userMsg]);
    setInput("");

    const botText = await getBotReply(messageText);
    const botMsg = { sender: "bot", text: botText, timestamp };
    setChat((prev) => [...prev, botMsg]);

    speak(botText);

    if (isHireTriggered) {
      setIsHireOpen(true);
      setIsHireTriggered(false);
    }

    setTimeout(scrollToBottom, 50);
  };

  const handleVoiceResult = async (text) => await handleSend(text);
  const handleClear = () => {
    setChat([]);
    setSuggestedOptions([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">
          Ashish Assistant 🤖
        </h2>

        <div
          className="flex-1 flex flex-col gap-3 p-3 sm:p-4 bg-white rounded-2xl shadow-lg border overflow-y-auto"
          style={{ maxHeight: "65vh" }}
        >
          {chat.map((msg, idx) =>
            msg.sender === "user" ? (
              <ChatBubble
                key={idx}
                sender={msg.sender}
                message={msg.text}
                timestamp={msg.timestamp}
                isUser
                onDelete={() =>
                  setChat((prev) => prev.filter((_, i) => i !== idx))
                }
                onEdit={(newText) =>
                  setChat((prev) =>
                    prev.map((m, i) =>
                      i === idx ? { ...m, text: newText } : m
                    )
                  )
                }
              />
            ) : (
              <TimelineCard
                key={idx}
                title="Ashish Assistant"
                description={msg.text}
                timestamp={msg.timestamp}
                isUser={false}
              />
            )
          )}
          <div ref={chatEndRef} />
        </div>

        {suggestedOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {suggestedOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(opt)}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm sm:text-base hover:bg-indigo-600 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Input & Actions */}
        <div className="mt-2 sm:mt-3 flex flex-col gap-2 sticky bottom-0 bg-gray-50 p-2 rounded-t-xl shadow-inner">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="flex-1 border p-2 sm:p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={() => handleSend()}
            >
              Send
            </button>
          </div>

          <div className="text-center flex flex-wrap justify-center gap-2 mt-2">
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

          <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row gap-2 items-center justify-center">
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
      </div>

      {isVoiceOpen && (
        <VoiceRecorder
          onClose={() => setIsVoiceOpen(false)}
          onResult={handleVoiceResult}
        />
      )}

      {/* ✅ Fixed HireForm mount issue */}
      {isHireOpen && (
        <HireForm
          key={isHireOpen ? "open" : "closed"}
          onClose={() => {
            setIsHireOpen(false);
            setTimeout(() => setIsHireOpen(false), 0);
          }}
        />
      )}
    </div>
  );
};

export default Assistant;
