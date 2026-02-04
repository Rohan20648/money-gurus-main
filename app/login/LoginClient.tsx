"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Inter } from "next/font/google";

import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export default function LoginClient() {
  const params = useSearchParams();
  const router = useRouter();

  const userType = params.get("type");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      // Firebase Auth Login
      const credential = await signInWithEmailAndPassword(
        auth,
        username + "@moneyguru.com",
        password
      );

      const uid = credential.user.uid;

      // Get user info from Firestore
      const userSnap = await getDoc(doc(db, "users", uid));

      if (!userSnap.exists()) {
        throw new Error("User data not found");
      }

      const userData = userSnap.data();

      // Store session info locally
      localStorage.setItem(
        "moneyguruUser",
        JSON.stringify({
          uid,
          username: userData.username,
          userType: userData.userType,
        })
      );

      // Decide where to go next
      const existing = localStorage.getItem("portfolioData");

      if (existing) {
        router.push("/portfolio");
      } else {
        router.push(`/dashboard?type=${userData.userType}`);
      }

    } catch (error) {
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 md:px-6`}
    >
      <div className="max-w-md w-full animate-fade-in space-y-6 md:space-y-10">

        <header className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            {userType === "student"
              ? "Student Login"
              : "Professional Login"}
          </h1>

          <p className="text-gray-400">
            Access your personalized financial dashboard
          </p>
        </header>

        <section className="space-y-6">

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-gray-700 focus:border-green-500 outline-none p-3 transition"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-transparent border-b border-gray-700 focus:border-green-500 outline-none p-3 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>

        </section>

        <footer className="text-center text-gray-400 text-sm space-y-2">
          <p>Don’t have an account?</p>

          <button
            onClick={() => router.push(`/signup?type=${userType}`)}
            className="text-green-400 underline"
          >
            Create Account
          </button>
        </footer>

      </div>
    </main>
  );
}
