// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPEFVwf9Vx-fGYwIumu_N4KrhALMnp8kc",
  authDomain: "anmol-web-app.firebaseapp.com",
  projectId: "anmol-web-app",
  storageBucket: "anmol-web-app.firebasestorage.app",
  messagingSenderId: "22967216934",
  appId: "1:22967216934:web:83e648c66d3113d6eaefe7",
  measurementId: "G-V7EJRKTSBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
