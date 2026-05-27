













import { useState, useEffect } from "react";
import API from "../utils/api"; // ✅ centralized API import

export const useAssistantLogic = () => {
  const [isHireTriggered, setIsHireTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminQA, setAdminQA] = useState([]);
  const [suggestedOptions, setSuggestedOptions] = useState([]);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const { data } = await API.get("/api/assistant");
        setAdminQA(data || []);
      } catch (err) {
        console.error("Error fetching assistant Q&A:", err.message);
      }
    };
    fetchQA();
  }, []);

  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text) ? "hi" : "en";
  };

  const generateReply = (message) => {
    const lower = message.toLowerCase();
    const lang = detectLanguage(message);

    const match = adminQA.find((qa) =>
      lower.includes(qa.question.toLowerCase())
    );
    if (match) return match.answer;

    const options = [
      "How to hire a freelancer?",
      "Know about Ashish before hiring",
      "Benefits of hiring Ashish",
      "Freelancing project idea",
    ];

    setSuggestedOptions(options);

    const replies = {
      about: {
        en: "👋 I'm Ashish's personal assistant! I can tell you about him, his projects, and help you hire him.",
        hi: "👋 Main Ashish ka personal assistant hoon! Main aapko unke projects aur kaam ke baare mein bata sakta hoon.",
      },
      contact: {
        en: "📧 Contact Ashish at ashishfreelance@gmail.com or LinkedIn: linkedin.com/in/ashishkumar1854",
        hi: "📧 Ashish se contact karein: ashishfreelance@gmail.com ya LinkedIn: linkedin.com/in/ashishkumar1854",
      },
      hire: {
        en: "💼 Awesome! Click the 'Hire Freelancer' button below and fill your project details. Bonus: 20% off for early clients!",
        hi: "💼 Shandar! Niche 'Hire Freelancer' button pe click karein aur apne project details fill karein. Bonus: Pehle clients ko 20% off!",
      },
      service: {
        en: "🛠️ Ashish provides full-stack web development, AI apps, portfolio websites, and project consultancy.",
        hi: "🛠️ Ashish full-stack web development, AI apps, portfolio websites aur project consultancy provide karte hain.",
      },
      skill: {
        en: "⚙️ Skilled in React, Node.js, Express, MongoDB, Python, AI/ML integrations.",
        hi: "⚙️ Skills: React, Node.js, Express, MongoDB, Python, AI/ML integrations.",
      },
      journey: {
        en: "📅 Ashish’s journey includes freelance projects, AI/ML learning, and building professional portfolios.",
        hi: "📅 Ashish ka journey freelance projects, AI/ML seekhna aur professional portfolios banana include karta hai.",
      },
      hello: {
        en: "👋 Hello! I’m Ashish Assistant 🤖. How can I help you today?",
        hi: "👋 Namaste! Main Ashish Assistant 🤖 hoon. Kaise madad kar sakta hoon?",
      },
      thanks: {
        en: "😊 You're welcome!",
        hi: "😊 Aapka swagat hai!",
      },
      freelancing: {
        en: "💡 Great! Think about your project type, features, and budget — then click 'Hire Freelancer'. You also get 20% off for early clients!",
        hi: "💡 Shandar! Apne project type, features aur budget ke baare mein sochein — fir 'Hire Freelancer' click karein. Aapko 20% off milega!",
      },
    };

    if (lower.includes("about") || lower.includes("who are you"))
      return replies.about[lang];
    if (
      lower.includes("contact") ||
      lower.includes("reach") ||
      lower.includes("email")
    )
      return replies.contact[lang];
    if (
      lower.includes("hire") ||
      lower.includes("freelancer") ||
      lower.includes("project")
    ) {
      setIsHireTriggered(true);
      return replies.hire[lang];
    }
    if (lower.includes("service") || lower.includes("what can you do"))
      return replies.service[lang];
    if (lower.includes("skill") || lower.includes("technology"))
      return replies.skill[lang];
    if (lower.includes("journey") || lower.includes("timeline"))
      return replies.journey[lang];
    if (lower.includes("hello") || lower.includes("hi"))
      return replies.hello[lang];
    if (lower.includes("thanks") || lower.includes("thank you"))
      return replies.thanks[lang];
    if (lower.includes("freelancing") || lower.includes("project idea")) {
      setIsHireTriggered(true);
      return replies.freelancing[lang];
    }

    return lang === "hi"
      ? "🤔 Main abhi seekh raha hoon! Thoda aur detail bata sakte hain?"
      : "🤔 I'm still learning! Could you rephrase or give more details?";
  };

  const getBotReply = async (userMsg) => {
    setIsLoading(true);
    const botReply = generateReply(userMsg);
    setTimeout(() => setIsLoading(false), 500);
    return botReply;
  };

  return {
    getBotReply,
    isHireTriggered,
    setIsHireTriggered,
    isLoading,
    suggestedOptions,
    setSuggestedOptions,
  };
};
