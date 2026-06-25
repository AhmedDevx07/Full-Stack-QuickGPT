import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
// import Community from "./pages/Community";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading" || loadingUser) return <Loading />;

  return (
    <>
      <Toaster />

      {/* Premium Mobile Top Sticky Navbar (Only visible when user is logged in and sidebar is closed) */}
      {user && !isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-[#242124]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between px-4 z-40 animate-fadeIn">
          {/* Option B: If you want to use the full text-logo directly without hardcoded text */}
          <div className="flex items-center select-none">
            <img
              src={assets.logo_full_dark} // Custom tracking default color setup
              className="h-6 max-w-[130px] object-contain dark:hidden"
              alt="QuickGPT"
            />
            <img
              src={assets.logo_full}
              className="h-8 max-w-[150px] object-contain hidden dark:block"
              alt="QuickGPT"
            />
          </div>

          {/* Right Side: Fully Functional Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 rounded-xl transition-all duration-200 text-slate-700 dark:text-slate-300 cursor-pointer flex items-center justify-center"
            aria-label="Open Menu"
          >
            <img
              src={assets.menu_icon}
              className="w-5 h-5 not-dark:invert object-contain"
              alt="Menu"
            />
          </button>
        </div>
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              {/* <Route path="/community" element={<Community />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
