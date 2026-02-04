"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") || "student";

  const [income, setIncome] = useState<number | "">("");
  const [recurring, setRecurring] = useState<number | "">("");
  const [leisure, setLeisure] = useState<number | "">("");
  const [savings, setSavings] = useState<number | "">("");
  const [emergency, setEmergency] = useState<number | "">("");
  const [investment, setInvestment] = useState<number | "">("");
  const [score, setScore] = useState(0);

  function computeScore() {
    const i = Number(income) || 0;
    const r = Number(recurring) || 0;
    const l = Number(leisure) || 0;
    const s = Number(savings) || 0;
    const e = Number(emergency) || 0;
    const inv = Number(investment) || 0;

    let savingsScore = 0;
    let emergencyScore = 0;
    let leisureScore = 0;
    let investmentScore = 0;
    let balanceScore = 0;

    const savingsRate = i > 0 ? s / i : 0;
    const emergencyMonths = r > 0 ? e / r : 0;
    const leisureRate = i > 0 ? l / i : 0;
    const investmentRate = i > 0 ? inv / i : 0;

    if (savingsRate >= 0.25) savingsScore = 3;
    else if (savingsRate >= 0.20) savingsScore = 2.5;
    else if (savingsRate >= 0.15) savingsScore = 2;
    else if (savingsRate >= 0.10) savingsScore = 1.5;
    else if (savingsRate > 0) savingsScore = 1;

    if (emergencyMonths >= 6) emergencyScore = 2;
    else if (emergencyMonths >= 3) emergencyScore = 1.5;
    else if (emergencyMonths >= 1) emergencyScore = 1;

    if (leisureRate <= 0.15) leisureScore = 2;
    else if (leisureRate <= 0.25) leisureScore = 1.5;
    else if (leisureRate <= 0.35) leisureScore = 1;

    if (investmentRate >= 0.20) investmentScore = 2;
    else if (investmentRate >= 0.10) investmentScore = 1.5;
    else if (investmentRate > 0) investmentScore = 1;

    if (i >= r + l + inv) balanceScore = 1;

    return Math.round(
      savingsScore +
        emergencyScore +
        leisureScore +
        investmentScore +
        balanceScore
    );
  }

  async function goToPortfolio() {
    const finalScore = computeScore();
    setScore(finalScore);

    const portfolio = {
      userType,
      income: Number(income) || 0,
      recurring: Number(recurring) || 0,
      leisure: Number(leisure) || 0,
      savings: Number(savings) || 0,
      emergency: Number(emergency) || 0,
      investment: Number(investment) || 0,
      score: finalScore,
      createdAt: new Date(),
    };

    try {
      const user = JSON.parse(
        localStorage.getItem("moneyguruUser") || "{}"
      );

      if (!user.uid) {
        alert("User session not found. Please login again.");
        window.location.href = "/login";
        return;
      }

      await setDoc(doc(db, "portfolios", user.uid), portfolio);

      window.location.href = "/portfolio";
    } catch (error) {
      alert("Failed to save portfolio. Please try again.");
    }
  }

  const num =
    (setter: (v: number | "") => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value === "" ? "" : Number(e.target.value));

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            {userType === "student"
              ? "Student Finance Hub"
              : "Personal Finance Hub"}
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            A smarter way to understand your money
          </p>
        </header>

        <div className="relative grid lg:grid-cols-5 gap-10">
          <section className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-semibold">Monthly Snapshot</h2>

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
              <Input label="Monthly Income" value={income} onChange={num(setIncome)} />
              <Input label="Recurring Costs" value={recurring} onChange={num(setRecurring)} />
              <Input label="Leisure Spending" value={leisure} onChange={num(setLeisure)} />
              <Input label="Savings" value={savings} onChange={num(setSavings)} />
              <Input label="Emergency Fund" value={emergency} onChange={num(setEmergency)} />
              <Input label="Monthly Investments" value={investment} onChange={num(setInvestment)} />
            </div>

            <button
              onClick={goToPortfolio}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition rounded-full font-semibold"
            >
              Generate Smart Report →
            </button>
          </section>

          <section className="lg:col-span-2 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-600/20 blur-3xl rounded-full"></div>

              <div className="relative text-center">
                <p className="text-gray-400 mb-2">Your Financial Score</p>
                <div className="text-9xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {score}
                </div>
                <p className="text-gray-500">out of 10</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-gray-700 focus:border-blue-500 outline-none p-2 text-lg transition"
      />
    </div>
  );
}
