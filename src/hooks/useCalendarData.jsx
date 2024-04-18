import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../auth/firebase';
import defaultScreenshot from '../assets/defaultScreenshot.png';

const useCalendarData = () => {
    const [calendars, setCalendars] = useState([]);
    const intersectionObserverRef = useRef(null);

    useEffect(() => {
        const fetchCalendars = async () => {
            const calendarCollection = collection(db, 'calendars');
            const calendarSnapshot = await getDocs(calendarCollection);

            const calendarData = [];
            for (const doc of calendarSnapshot.docs) {
                const data = doc.data();
                const imageUrl = defaultScreenshot;
                calendarData.push({ ...data, id: doc.id, imageUrl });
            }

            setCalendars(calendarData);
        };

        fetchCalendars();
    }, []);

    useEffect(() => {
        const observer = intersectionObserverRef.current;
        if (observer) {
            observer.disconnect();
        }

        intersectionObserverRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const calendarId = entry.target.getAttribute('data-calendar-id');
                        loadImage(calendarId);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
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
            if (!calendarId) {
                console.error('Calendar ID is undefined');
                return;
            }

            const imageUrl = await getImageUrl(calendarId);
            setCalendars((prevCalendars) =>
                prevCalendars.map((calendar) =>
                    calendar.id === calendarId ? { ...calendar, imageUrl } : calendar
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

    return { calendars, intersectionObserverRef };
};

export default useCalendarData;