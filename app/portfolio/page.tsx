"use client";
import { useEffect, useState } from "react";

import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

type PortfolioData = {
  userType: string;
  income: number;
  recurring: number;
  leisure: number;
  savings: number;
  emergency: number;
  investment: number;
  score: number;
};

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [advice, setAdvice] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      alert("Failed to logout");
    }
  }

  // Load portfolio from Firebase instead of localStorage
  useEffect(() => {
    async function loadPortfolio() {
      try {
        const user = JSON.parse(
          localStorage.getItem("moneyguruUser") || "{}"
        );

        if (!user.uid) {
          window.location.href = "/login";
          return;
        }

        const ref = doc(db, "portfolios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data() as PortfolioData);
        } else {
          // If no portfolio found, send user back to dashboard
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Failed to load portfolio");
      }
    }

    loadPortfolio();
  }, []);

  // Fetch AI advice (kept exactly the same)
  useEffect(() => {
    if (!data) return;

    async function fetchAdvice() {
      setLoading(true);

      const res = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.advice) setAdvice(result.advice);
      setLoading(false);
    }

    fetchAdvice();
  }, [data]);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-12">

        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold">Financial Overview</h1>
            <p className="text-gray-400 mt-2">
              A clear picture of your money habits
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </header>

        {/* Hero Score */}
        <section className="flex items-center gap-10">
          <div className="text-8xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {data.score}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Overall Health Score</h2>
            <p className="text-gray-400">
              Calculated from your financial behavior
            </p>
          </div>
        </section>

        {/* Metrics - modern strips */}
        <section className="space-y-4">
          <Metric label="Income" value={data.income} />
          <Metric label="Recurring Costs" value={data.recurring} />
          <Metric label="Leisure Spending" value={data.leisure} />
          <Metric label="Savings" value={data.savings} />
          <Metric label="Emergency Fund" value={data.emergency} />
          <Metric label="Monthly Investments" value={data.investment} />
        </section>

        {/* Insights */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Smart Insights</h2>

          {loading && (
            <p className="text-gray-400">Analyzing your finances...</p>
          )}

          <div className="space-y-6">
            {advice.map((a, i) => (
              <div
                key={i}
                className="border-l-4 border-blue-500 pl-5 text-lg leading-relaxed text-gray-200"
              >
                {a}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
      <span className="text-gray-400">{label}</span>
      <span className="text-2xl font-semibold">₹{value}</span>
    </div>
  );
}
