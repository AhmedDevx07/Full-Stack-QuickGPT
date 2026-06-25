import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, axios } = useAppContext();

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("/api/credit/plan", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setPlans(data.plans);
      } else {
        toast.error(data.message || "Failed to fetch plans.");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        "/api/credit/purchase",
        { planId },
        { headers: { Authorization: token } },
      );
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 w-full mx-auto h-screen overflow-y-auto bg-slate-50/50 dark:bg-transparent scrollbar-none animate-fadeIn">
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto mb-12 lg:mt-6">
        <span className="text-xs font-bold tracking-widest uppercase text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
          Pricing Plans
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white mt-3">
          Boost Your Creative Power
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Choose the perfect credit bundle to scale your AI imaging workflow
          without limits.
        </p>
      </div>

      {/* Pricing Grid Layout */}
      <div className="flex flex-wrap justify-center items-stretch gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          // Highlight dynamic state for featured tier (e.g., if ID contains 'pro' or 'business')
          const isFeatured = plan._id.toLowerCase().includes("pro");

          return (
            <div
              key={plan._id}
              className={`relative flex flex-col justify-between p-7 w-full sm:w-[320px] rounded-2xl border transition-all duration-300 transform hover:-translate-y-1
                ${
                  isFeatured
                    ? "bg-gradient-to-b from-purple-600/[0.08] to-indigo-600/[0.02] dark:from-purple-900/30 dark:to-slate-950/40 border-purple-500 shadow-xl shadow-purple-600/5"
                    : "bg-white dark:bg-slate-900/40 border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-xl shadow-slate-200/50 dark:shadow-none"
                }`}
            >
              {/* Featured Ribbon Tag */}
              {isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-0.5 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div className="flex-1">
                {/* Plan Header */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                      / {plan.credits} Credits
                    </span>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-white/5 mb-5" />

                {/* Modern Checkmark Feature List */}
                <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFeatured ? "text-purple-500" : "text-emerald-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Action Trigger Button */}
              <button
                onClick={() =>
                  toast.promise(purchasePlan(plan._id), {
                    loading: "Configuring payment gateway...",
                  })
                }
                className={`w-full py-3 mt-8 text-xs font-semibold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer text-center
                  ${
                    isFeatured
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20"
                      : "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white"
                  }`}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Credits;
