// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqcMVLZ2S553UImlzVW7Wl_IGZYduUmlk",

  authDomain: "ticketsystem-294fd.firebaseapp.com",

  projectId: "ticketsystem-294fd",

  storageBucket: "ticketsystem-294fd.appspot.com",

  messagingSenderId: "314560138780",

  appId: "1:314560138780:web:c2fc66f9ab9df0d3c759d9",

  measurementId: "G-E7Z30R1RWZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db: Firestore = getFirestore(app);
