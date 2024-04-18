import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../adminCalendars/adminCalendars.css";
import "../adminpanel/adminpanel.css";
import Leftbar from "../../components/leftbar/Leftbar";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../../auth/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function AdminCalendars() {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      const calendarCollection = collection(db, "calendars");
      const calendarSnapshot = await getDocs(calendarCollection);

      const calendarData = [];
      for (const doc of calendarSnapshot.docs) {
        const data = doc.data();
        const imageUrl = await getImageUrl(data.calendarTitle);
        calendarData.push({ ...data, id: doc.id, imageUrl });
      }

      setCalendars(calendarData);
    };

    fetchCalendars();
  }, []);

  const getImageUrl = async (calendarTitle) => {
    try {
      if (!calendarTitle) {
        console.error("Calendar title is undefined");
        return null;
      }

      const storageRef = ref(storage, `images/${calendarTitle}.png`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.error(`Image not found for title: ${calendarTitle}`);
        return 'https://via.placeholder.com/150';
      } else {
        console.error("Error fetching image URL:", error);
        return null;
      }
    }
  };

  return (
    <Row className="mainContent">
      <Col xs={2} className="leftBarCol">
        <Leftbar />
      </Col>
      <Col xs={9} className="adminCalendars">
        <p className="adminCalendarTitle">Calendars</p>
        <div className="dropDowns">
          <div className="price">
            <DropdownButton
              className="adminCalendarsDropDown"
              id="dropdown-item-button"
              title="Select free or paid"
            >
              <Dropdown.Item className="dropDownItem" as="button">
                Free
              </Dropdown.Item>
              <Dropdown.Item as="button">Paid</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="topic">
            <DropdownButton id="dropdown-item-button" title="Choose topic" className="dropdownItemAdmin">
              <Dropdown.Item as="button">Adults</Dropdown.Item>
              <Dropdown.Item as="button">Animals</Dropdown.Item>
              <Dropdown.Item as="button">Children and teenagers</Dropdown.Item>
              <Dropdown.Item as="button">Elderly</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="cards">
          {calendars.map((calendar) => (
            <Card
              key={calendar.id}
              className="calendarCard d-flex flex-column justify-content-center align-items-center"
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center adminCalendarBody">
                <NavLink to={`/calendar`} style={{ textDecoration: "none" }}>
                  <Card.Img
                    src={calendar.imageUrl}
                    className="calendarScreenShot"
                  />
                </NavLink>
                <Card.Title style={{ color: "black" }}>
                  {calendar.title}
                </Card.Title>
              </Card.Body>
              <NavLink
                to={`/modify-old-calendar/${calendar.id}`}
                className="modifyButton btn btn-primary"
              >
                Modify
              </NavLink>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  );
}