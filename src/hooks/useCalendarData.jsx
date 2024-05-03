import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../auth/firebase';
import defaultScreenshot from '../assets/defaultScreenshot.png';

const useCalendarData = () => {
    const [loading, setLoading] = useState(true);
    const [calendars, setCalendars] = useState([]);
    const intersectionObserverRef = useRef(null);

    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const calendarCollection = collection(db, 'calendars');
                const calendarSnapshot = await getDocs(calendarCollection);

                const calendarData = [];
                for (const doc of calendarSnapshot.docs) {
                    const data = doc.data();
                    calendarData.push({ ...data, id: doc.id });
                }

                setCalendars(calendarData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching calendars:', error);
            }
        };

        fetchCalendars();
    }, []);

    useEffect(() => {
        intersectionObserverRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const calendarId = entry.target.getAttribute('data-calendar-id');
                        loadImage(calendarId);
                        intersectionObserverRef.current.unobserve(entry.target);
                    }
                });
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

    const loadImage = async (calendarId) => {
        try {
            const imageUrl = await getImageUrl(calendarId);
            if (!imageUrl) {
                return;
            }
            setCalendars((prevCalendars) =>
                prevCalendars.map((calendar) =>
                    calendar.id === calendarId ? { ...calendar, imageUrl, isLoading: false } : calendar
                )
            );
        } catch (error) {
            console.error('Error loading image:', error);
        }
    };

    const getImageUrl = async (calendarId) => {
        try {
            const storageRef = ref(storage, `screenshots/${calendarId}.png`);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                console.error(`Image not found for ID: ${calendarId}`);
            } else {
                console.error('Error fetching image URL:', error);
            }
            return defaultScreenshot;
        }
    };

    return { loading, calendars, intersectionObserverRef };
};

export default useCalendarData;
