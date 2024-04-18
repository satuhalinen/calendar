import { useState, useEffect } from "react";
import { db, storage } from "../../auth/firebase";
import { getDocs, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Card, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./Calendars.css";

export default function Calendars() {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const calendarCollection = collection(db, "calendars");
        const calendarSnapshot = await getDocs(calendarCollection);

        const calendarData = [];
        for (const doc of calendarSnapshot.docs) {
          const data = doc.data();
          const imageUrl = await getImageUrl(doc.id);
          calendarData.push({ ...data, id: doc.id, imageUrl });
        }

        setCalendars(calendarData);
      } catch (error) {
        console.error("Error fetching calendars:", error);
      }
    };

    fetchCalendars();
  }, []);

  const getImageUrl = async (calendarId) => {
    try {
      const storageRef = ref(storage, `screenshots/${calendarId}.png`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.error(`Image not found for ID: ${calendarId}`);
        return defaultScreenshot;
      } else {
        console.error("Error fetching image URL:", error);
        return null;
      }
    }
  };

  return (
    <Row className="mainContent">
      <Col className="userCalendarsContainer">
        <p className="calendarsTitle">Calendars</p>
        <div className="dropDowns">
          <div className="topic">
            <DropdownButton id="dropdown-item-button" title="Sort">
              <Dropdown.Item as="button">Adults</Dropdown.Item>
              <Dropdown.Item as="button">Animals</Dropdown.Item>
              <Dropdown.Item as="button">Children and teenagers</Dropdown.Item>
              <Dropdown.Item as="button">Elderly</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="calendarGrid">
          {calendars.map((calendar) => (
            <Card key={calendar.id} className="calendarCard d-flex flex-column justify-content-center align-items-center">
              <NavLink to={`/calendar/${calendar.id}`} className="linkToOneCalendar" style={{ textDecoration: "none" }}>
                <Card.Img className="calendarCardImg" src={calendar.imageUrl || defaultScreenshot} />
                <button
                  className="useCalendarButton"
                  style={{
                    backgroundColor: "#BA6C2C",
                    border: "none",
                    color: "#F4EDE7",
                  }}
                >
                  Use calendar
                </button>
              </NavLink>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  );
}