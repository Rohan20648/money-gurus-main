import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (from your screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyBGUc1UlMRdBBLRG8KLYZnFNt88UsXWjb0",
  authDomain: "money-guru-ac22e.firebaseapp.com",
  projectId: "money-guru-ac22e",
  storageBucket: "money-guru-ac22e.appspot.com",
  messagingSenderId: "527373705697",
  appId: "1:527373705697:web:0e13448e4386f73d00b2a0",
};

// Initialize Firebase safely for Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
