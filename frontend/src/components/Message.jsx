import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import prism from "prismjs";

const Message = ({ message }) => {
  useEffect(() => {
    prism.highlightAll();
  }, [message.content]);

  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} my-2 animate-fadeIn min-w-0`}>
  <div
    className={`flex gap-3 max-w-[88%] md:max-w-2xl items-start min-w-0 ${isUser ? "flex-row-reverse" : "flex-row"}`}
  >
    {/* Avatar Status */}
    <div className="flex-shrink-0">
      {isUser ? (
        <img
          src={assets.user_icon || "https://via.placeholder.com/150"}
          alt="User"
          className="w-8 h-8 rounded-full border border-purple-500/20 object-cover shadow-sm"
        />
      ) : (
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-purple-600/10">
          AI
        </div>
      )}
    </div>

    {/* Message Bubble Body - Added min-w-0 and max-w-full to prevent push */}
    <div className="flex flex-col space-y-1.5 min-w-0 max-w-full">
      <div
        className={` p-3.5 px-4.5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all overflow-hidden break-words
          ${
            isUser
              ? "bg-purple-600 dark:bg-purple-600 text-white rounded-tr-none shadow-purple-600/5"
              : "bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-white/5 backdrop-blur-md"
          }`}
      >
        {/* Visual AI Generation Handler */}
        {!isUser && message.isImage ? (
          <div className=" relative group overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 mt-1 max-w-full">
            <img
              src={message.content}
              alt="Generated AI Visual"
              className=" w-full max-w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ) : (
          /* Markdown Text Handler - Added overflow-x-auto for long non-breaking elements */
          <div
            className={`text-sm leading-relaxed reset-tw break-words max-w-full overflow-x-auto whitespace-pre-wrap ${isUser ? "text-white" : "text-slate-800 dark:text-slate-200"}`}
          >
            <Markdown>{message.content}</Markdown>
          </div>
        )}
      </div>

      {/* Time stamp Badge */}
      <span
        className={`text-[10px] tracking-wide text-slate-400 dark:text-slate-500 px-1 ${isUser ? "text-right block" : "text-left block"}`}
      >
        {moment(message.timestamp).fromNow()}
      </span>
    </div>
  </div>
</div>
  );
};

export default Message;
