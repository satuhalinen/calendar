import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "adventcalendar-d45aa.firebaseapp.com",
  projectId: "adventcalendar-d45aa",
  storageBucket: "adventcalendar-d45aa.appspot.com",
  messagingSenderId: "751232377525",
  appId: "1:751232377525:web:37fb252cfcbeee7fedd4fc",
  measurementId: "G-L0QFRDN492",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};
