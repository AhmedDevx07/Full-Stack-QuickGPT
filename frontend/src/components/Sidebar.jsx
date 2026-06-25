import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    selectedChat, // Added selectedChat to style active item cleanly
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUserChats,
    setToken,
    token,
  } = useAppContext();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm(
        `Are you sure you want to delete this chat?`,
      );
      if (!confirm) return;
      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        {
          headers: { Authorization: token },
        },
      );
      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUserChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-76 w-76 p-5 
      bg-white/60 dark:bg-slate-950/40 
      border-r border-slate-200/50 dark:border-purple-950/20 
      backdrop-blur-xl max-md:bg-white max-md:dark:bg-slate-950
      transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
      max-md:fixed left-0 top-0 z-50 ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between mt-2">
        <img
          src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
          alt="logo"
          className="w-full max-w-44 object-contain"
        />
        <button
          onClick={() => setIsMenuOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <img
            src={assets.close_icon}
            className="w-5 h-5 not-dark:invert"
            alt="close"
          />
        </button>
      </div>

      {/* Modern Gradient Action Button */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center gap-2 w-full py-3 mt-8
        text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
        text-sm font-medium rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.4)]
        transition-all duration-200 cursor-pointer active:scale-[0.98]"
      >
        <span className="text-lg font-bold">+</span> New Chat
      </button>

      {/* Custom Styled Search Input */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 mt-5 bg-slate-100/50 dark:bg-white/5 
        border border-slate-200 dark:border-white/10 rounded-xl focus-within:border-purple-500 transition-all"
      >
        <img
          src={assets.search_icon}
          className="w-4 opacity-50 not-dark:invert"
          alt="search"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations..."
          className="text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none w-full bg-transparent"
        />
      </div>

      {/* Recent Chats Section */}
      {chats.length > 0 && (
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
          Recent Chats
        </p>
      )}

      <div className="flex-1 overflow-y-auto mt-2 pr-1 space-y-1.5 scrollbar-none">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((chat) => {
            const isActive = selectedChat?._id === chat._id;
            return (
              <div
                onClick={() => {
                  navigate("/");
                  setSelectedChat(chat);
                  setIsMenuOpen(false);
                }}
                key={chat._id}
                className={`group relative p-3 px-4 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-600/10 border border-purple-500/30 dark:bg-purple-500/5 dark:border-purple-500/20"
                      : "border border-transparent hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
              >
                {/* Left Active Accent Bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-purple-600 dark:bg-purple-500" />
                )}

                <div className="flex-1 min-w-0 pr-2">
                  <p
                    className={`text-sm truncate font-medium ${isActive ? "text-purple-700 dark:text-purple-400" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    {chat.messages.length > 0
                      ? chat.messages[0].content
                      : chat.name}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>

                <button
                  onClick={(e) =>
                    toast.promise(deleteChat(e, chat._id), {
                      loading: "Deleting...",
                      success: "Chat removed",
                      error: "Could not delete",
                    })
                  }
                  className="  p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
                >
                  <img
                    src={assets.bin_icon}
                    className="w-3.5 not-dark:invert opacity-70 hover:opacity-100"
                    alt="delete"
                  />
                </button>
              </div>
            );
          })}
      </div>

      {/* Bottom Actions Container */}
      <div className="mt-auto pt-4 space-y-2 border-t border-slate-200/60 dark:border-white/5">
        {/* Community Navigation */}
        {/* <div
          onClick={() => {
            navigate("/community");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-all duration-200"
        >
          <img
            src={assets.gallery_icon}
            className="w-4.5 not-dark:invert"
            alt="gallery"
          />
          <p className="text-sm font-medium">Community Images</p>
        </div> */}

        {/* Dynamic Premium Credit Bar */}
        <div
          onClick={() => {
            navigate("/credits");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:from-amber-500/5 dark:to-orange-500/5 dark:border-amber-500/10 rounded-xl cursor-pointer text-slate-700 dark:text-slate-300 transition-all duration-200"
        >
          <img
            src={assets.diamond_icon}
            className="w-4.5 text-amber-500"
            alt="credits"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              Credits : {user?.credits ?? 0}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Upgrade to Premium
            </p>
          </div>
        </div>

        {/* Theme Settings Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-100/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-xl text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <img
              src={assets.theme_icon}
              alt="theme"
              className="w-4.5 not-dark:invert"
            />
            <p className="text-sm font-medium">Dark Mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
            />
            <div className="w-9 h-5 bg-slate-300 dark:bg-slate-800 rounded-full peer peer-checked:bg-purple-600 transition-all duration-200"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4"></div>
          </label>
        </div>

        {/* Interactive User Account Footer */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:bg-slate-100 dark:hover:bg-white/5  group text-slate-700 dark:text-slate-300 transition-all">
          <img
            src={assets.user_icon || "https://via.placeholder.com/150"}
            className="w-8 h-8 rounded-full border border-purple-500/30"
            alt="profile"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-purple-300 truncate">
              {user ? user.name : "Login to Account"}
            </p>
          </div>
          {user && (
            <button
              onClick={logout}
              className="p-1.5  cursor-pointer rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
              title="Logout"
            >
              <img
                src={assets.logout_icon}
                className="w-4 h-4 not-dark:invert opacity-70 hover:opacity-100"
                alt="logout"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
