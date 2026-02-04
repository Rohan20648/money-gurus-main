"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export default function SignupContent() {
  const router = useRouter();
  const params = useSearchParams();

  const userType = params.get("type");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!username || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Create user in Firebase Auth
      const credential = await createUserWithEmailAndPassword(
        auth,
        username + "@moneyguru.com",
        password
      );

      const uid = credential.user.uid;

      // Store extra user info in Firestore
      await setDoc(doc(db, "users", uid), {
        username,
        userType,
        createdAt: new Date(),
      });

      router.push(`/login?type=${userType}`);
    } catch (error: any) {
  console.error("Firebase signup error:", error);
  alert("Signup failed: " + error.message);
}
 finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 md:px-6`}
    >
      <div className="max-w-md w-full space-y-8">

        <header className="text-center">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-gray-400">
            Sign up to start your financial journey
          </p>
        </header>

        <div className="space-y-5">

          <input
            placeholder="Username"
            className="w-full bg-transparent border-b border-gray-700 p-3 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b border-gray-700 p-3 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-transparent border-b border-gray-700 p-3 outline-none"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 bg-green-500 text-black rounded-full font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </div>

      </div>
    </main>
  );
}
