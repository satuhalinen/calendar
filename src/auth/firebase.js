import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "adventcalendar-b2e76.firebaseapp.com",
  projectId: "adventcalendar-b2e76",
  storageBucket: "adventcalendar-b2e76.appspot.com",
  messagingSenderId: "689918361565",
  appId: "1:689918361565:web:9d0e01d0ac5eba015ec034",
  measurementId: "G-L67CMF6Q1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
