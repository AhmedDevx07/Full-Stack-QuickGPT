import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Loading = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
      navigate("/");
    }, 8000);
    return () => clearTimeout(timeout);
  }, [fetchUser, navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09070f]/80 backdrop-blur-xl h-screen w-screen text-white select-none animate-fadeIn">
      {/* High-End Ambient Glow behind the spinner */}
      <div className="absolute w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Advanced Double-Ring Glowing Spinner */}
        <div className="relative w-12 h-12">
          {/* Outer Track Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/10"></div>
          {/* Inner Active Spinning Accent */}
          <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-indigo-500 animate-spin shadow-[0_0_15px_rgba(168,85,247,0.2)]"></div>
        </div>

        {/* Minimalist Professional Typography Status */}
        <div className="text-center mt-2 z-10">
          <p className="text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-purple-200 to-slate-200 bg-clip-text text-transparent">
            Syncing Console
          </p>
          <p className="text-[10px] text-purple-400/60 font-medium tracking-wide mt-1 animate-pulse">
            Authenticating credentials...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
