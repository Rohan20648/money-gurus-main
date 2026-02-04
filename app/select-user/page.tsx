"use client";

import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SelectUser() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 md:px-6`}
    >
      <div className="max-w-4xl w-full space-y-12 animate-fade-in">

        <header className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Choose Your Profile
          </h2>

          <p className="text-gray-400 text-lg">
            Select the experience that best matches your financial stage
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-10">

          <Link href="/login?type=student">
            <div className="group cursor-pointer relative rounded-3xl p-6 md:p-10 transition hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition"></div>

              <div className="relative border border-green-500/20 bg-black/40 backdrop-blur-xl rounded-3xl p-8 h-full">
                <h3 className="text-2xl font-semibold mb-2">Student</h3>

                <p className="text-gray-400">
                  Build responsible money habits, manage allowance, and learn financial discipline in a safe environment.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/login?type=adult">
            <div className="group cursor-pointer relative rounded-3xl p-6 md:p-10 transition hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition"></div>

              <div className="relative border border-blue-500/20 bg-black/40 backdrop-blur-xl rounded-3xl p-8 h-full">
                <h3 className="text-2xl font-semibold mb-2">Working Professional</h3>

                <p className="text-gray-400">
                  Track income, expenses, savings, and investments with intelligent insights for long-term growth.
                </p>
              </div>
            </div>
          </Link>

        </section>

        <footer className="text-center text-gray-600 text-sm">
          Your data is used only to personalize the experience
        </footer>

      </div>
    </main>
  );
}
