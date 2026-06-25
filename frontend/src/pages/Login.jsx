import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { axios, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? "/api/user/login" : "/api/user/register";
    try {
      const { data } = await axios.post(url, { name, email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(
          state === "login" ? "Welcome back!" : "Account created successfully!",
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative animate-fadeIn">
      {/* Premium Background Glow Effect behind the card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-5 items-start p-8 py-10 w-84 sm:w-[368px] 
        bg-slate-950/60 dark:bg-slate-950/50 backdrop-blur-xl
        border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-slate-300"
      >
        <div className="w-full text-center mb-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {state === "login" ? "Welcome Back" : "Get Started"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {state === "login"
              ? "Sign in to access QuickGPT console"
              : "Create an account to start generating"}
          </p>
        </div>

        {state === "register" && (
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              className="bg-white/5 border border-white/10 rounded-xl w-full p-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
            className="bg-white/5 border border-white/10 rounded-xl w-full p-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            type="email"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            className="bg-white/5 border border-white/10 rounded-xl w-full p-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/20 active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Sign In"}
        </button>

        <div className="w-full text-center mt-2">
          {state === "register" ? (
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors"
              >
                Sign in
              </span>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Don't have an account yet?{" "}
              <span
                onClick={() => setState("register")}
                className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
