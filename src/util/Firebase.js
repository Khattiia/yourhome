import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCKEx2R3WKxJ1U9gvqVR0j2mUjMkAo-CLY",
  authDomain: "your-home-3d939.firebaseapp.com",
  projectId: "your-home-3d939",
  storageBucket: "your-home-3d939.appspot.com",
  messagingSenderId: "502160788476",
  appId: "1:502160788476:web:fa105dab8ba7f678a28079",
  measurementId: "G-VQQRCY7GS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
