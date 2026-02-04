"use client";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* HERO AREA */}
        <section className="min-h-[90vh] flex flex-col justify-center animate-fade-in">

          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Build better money habits  
              with <span className="text-green-400">MoneyGuru</span>
            </h1>

            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl">
              A smart financial companion that focuses on the quality of your decisions,  
              not just the size of your bank balance.
            </p>

            <div className="pt-6">
              <Link href="/select-user">
                <button className="px-14 py-4 rounded-full bg-green-500 text-black font-semibold text-lg hover:scale-105 transition-transform">
                  Enter MoneyGuru →
                </button>
              </Link>
            </div>
          </div>

        </section>

        {/* SINGLE HIGHLIGHT SECTION */}
        <section className="pb-32">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Finance apps track.  
                MoneyGuru teaches.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed">
                Instead of just showing where your money went, MoneyGuru evaluates  
                whether your financial behavior is healthy, risky, or improving.
              </p>

              <p className="text-gray-400 text-lg leading-relaxed">
                Each month you receive a clear Guru Score and actionable insights  
                designed to gradually strengthen your financial discipline.
              </p>
            </div>

            <div className="border-l border-gray-700 pl-10 space-y-8">

              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Clear Inputs
                </h3>
                <p className="text-gray-400">
                  Simple monthly details: income, expenses, savings, and investments.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Intelligent Analysis
                </h3>
                <p className="text-gray-400">
                  We evaluate discipline and balance instead of raw totals.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Practical Guidance
                </h3>
                <p className="text-gray-400">
                  Personalized advice to help you improve month after month.
                </p>
              </div>

            </div>

          </div>

        </section>

        <footer className="text-center text-gray-600 text-sm pb-10">
          MoneyGuru • Focused on financial discipline, not just data
        </footer>

      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
