import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import happySymbol from "../../assets/happy.svg";
import { Col, NavLink, Row } from "react-bootstrap";
import "../adminCalendars/adminCalendars.css";
import "../adminpanel/adminpanel.css";
import Leftbar from "../../components/leftbar/Leftbar";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../auth/firebase";

export default function AdminCalendars() {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      const calendarCollection = collection(db, "calendars");
      const calendarSnapshot = await getDocs(calendarCollection);
      setCalendars(
        calendarSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchCalendars();
  }, []);

  return (
    <Row className="mainContent">
      <Col xs={2} className="leftBarCol">
        <Leftbar />
      </Col>
      <Col xs={9} className="adminCalendars">
        <p className="adminCalendarTitle">Calendars</p>
        <div className="dropDowns">
          {" "}
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
            <DropdownButton id="dropdown-item-button" title="Choose topic">
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
              <NavLink style={{ textDecoration: "none" }}>
                <Card.Img variant="top" src={happySymbol} />
              </NavLink>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title style={{ color: "black" }}>
                  {calendar.id}
                </Card.Title>
              </Card.Body>
              <Button
                variant="primary"
                className="mt-auto"
                style={{
                  backgroundColor: "#BA6C2C",
                  border: "none",
                  color: "#F4EDE7",
                }}
              >
                Modify
              </Button>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  );
}
