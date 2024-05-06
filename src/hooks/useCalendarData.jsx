import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../auth/firebase";
import defaultScreenshot from "../assets/defaultScreenshot.png";

const useCalendarData = () => {
  const [loading, setLoading] = useState(true);
  const [calendars, setCalendars] = useState([]);
  const intersectionObserverRef = useRef(null);

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
        const calendarCollection = collection(db, "calendars");
        const calendarSnapshot = await getDocs(calendarCollection);

        const calendarData = calendarSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setCalendars(calendarData);
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
            setCalendars((prevCalendars) =>
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

  return { loading, calendars, intersectionObserverRef };
};

export default useCalendarData;
