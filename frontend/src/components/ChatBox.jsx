import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme, user, axios, token, setUser } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  // Frozen to "text" mode so it always safely requests text-to-text API endpoints
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user) return toast.error("Login to send message");
      if (!prompt.trim()) return;

      setLoading(true);
      const promptCopy = prompt;
      setPrompt("");
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
          timestamp: Date.now(),
          isImage: false,
        },
      ]);

      const { data } = await axios.post(
        `/api/message/${mode}`, // Will safely hit /api/message/text
        { chatId: selectedChat._id, prompt, isPublished },
        { headers: { Authorization: token } },
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.reply]);
        setUser((prev) => ({ ...prev, credits: prev.credits - 1 }));
      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between h-screen p-4 md:p-8 max-md:pt-20 bg-slate-50/50 dark:bg-transparent w-full min-w-0 overflow-hidden">
      {/* Chat Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto pr-2 space-y-6 mb-4 scrollbar-none w-full normal-case"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn px-4">
            <div className="opacity-80 dark:opacity-90 max-w-48 sm:max-w-56 mb-6">
              <img
                src={
                  theme === "dark" ? assets.logo_full : assets.logo_full_dark
                }
                alt="QuickGPT"
                className="w-full h-auto object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              Ask me anything.
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-sm">
              Your intelligent AI assistant is ready to help you generate
              answers instantly.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Premium Loading Shimmer */}
        {loading && (
          <div className="flex items-start gap-4 animate-fadeIn">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md animate-pulse">
              AI
            </div>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 rounded-2xl rounded-tl-none p-4 max-w-xs shadow-sm">
              <div className="flex items-center gap-1.5 h-3">
                <div className="w-2 h-2 rounded-full bg-purple-600/70 dark:bg-purple-400/80 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-purple-600/70 dark:bg-purple-400/80 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-purple-600/70 dark:bg-purple-400/80 animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Community Settings Checkbox Block completely removed to prevent empty render spacing */}

      {/* Control Console Prompt Box */}
      <div className="w-full max-w-3xl mx-auto">
        <form
          onSubmit={onSubmit}
          className="bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 rounded-2xl p-2.5 pl-4 flex gap-3 items-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-within:border-purple-500/70 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all duration-200"
        >
          {/* Custom Styled Badge replaces the legacy Dropdown element */}
          <div className="flex-shrink-0 select-none bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-purple-500/10">
            AI Text
          </div>

          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Type your prompt here..."
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none py-1 w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              loading
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/10 cursor-pointer active:scale-95"
            }`}
          >
            <img
              src={loading ? assets.stop_icon : assets.send_icon}
              className="w-4 h-4 brightness-0 invert"
              alt="action_button"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
