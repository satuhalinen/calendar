import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../auth/firebase";
import defaultScreenshot from "../assets/defaultScreenshot.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { query, where } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

const useMyCalendarData = () => {
  const [loading, setLoading] = useState(true);
  const [myCalendars, setMyCalendars] = useState([]);
  const intersectionObserverRef = useRef(null);
  const [user] = useAuthState(auth);

  const loadImage = async (calendarId) => {
    try {
      const storageRef = ref(storage, `screenshots/${calendarId}.png`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        console.error(`Image not found for ID: ${calendarId}`);
      } else {
        console.error("Error fetching image URL:", error);
      }
      return defaultScreenshot;
    }
  };

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const userCollection = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );
        const userSnapshot = await getDocs(userCollection);

        const document = userSnapshot.docs[0];

        const docId = document.id;

        const querySnapshot = await getDocs(
          collection(db, "users", docId, "myCalendars")
        );

        const idArray = [];
        querySnapshot.forEach((doc) => {
          idArray.push(doc.id);
        });

        const calendarData = [];
        for (const id of idArray) {
          try {
            const docRef = doc(db, "calendars", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const calendar = docSnap.data();

              calendarData.push({ ...calendar, id: id });
            } else {
              console.log("No such document for ID " + id + "!");
            }
          } catch (error) {
            console.log("Error getting document for ID " + id + ":", error);
          }
        }
        setMyCalendars(calendarData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calendars:", error);
      }
    };

    fetchCalendars();
  }, []);

  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const calendarId = entry.target.getAttribute("data-calendar-id");
            const imageUrl = await loadImage(calendarId);
            setMyCalendars((prevCalendars) =>
              prevCalendars.map((calendar) =>
                calendar.id === calendarId
                  ? { ...calendar, imageUrl }
                  : calendar
              )
            );
            intersectionObserverRef.current.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    return () => {
      const observer = intersectionObserverRef.current;
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return { loading, myCalendars, intersectionObserverRef };
};

export default useMyCalendarData;
