// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBPHRk80nPaxN4q7g7DLSLwB_TMca1rxs",
  authDomain: "satyam-c26d6.firebaseapp.com",
  projectId: "satyam-c26d6",
  storageBucket: "satyam-c26d6.firebasestorage.app",
  messagingSenderId: "568911746028",
  appId: "1:568911746028:web:a103d64a9b41691ed326c9",
  measurementId: "G-KPV85YH3YT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics sirf client side pe run hoga
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
