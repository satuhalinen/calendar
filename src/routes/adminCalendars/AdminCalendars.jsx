import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import useCalendarData from "../../hooks/useCalendarData";
import "../adminCalendars/adminCalendars.css";
import "../adminpanel/adminpanel.css";

export default function AdminCalendars() {
  const { calendars, intersectionObserverRef } = useCalendarData();

  return (
    <Row className="mainContent adminCalendarsContainer">
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
            <DropdownButton
              id="dropdown-item-button"
              title="Choose topic"
              className="dropdownItemAdmin"
            >
              <Dropdown.Item as="button">Adults</Dropdown.Item>
              <Dropdown.Item as="button">Animals</Dropdown.Item>
              <Dropdown.Item as="button">Children and teenagers</Dropdown.Item>
              <Dropdown.Item as="button">Elderly</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="adminCalendarCards">
          {calendars.map((calendar) => (
            <Card
              key={calendar.id}
              className="calendarCard d-flex flex-column justify-content-center align-items-center"
              data-calendar-id={calendar.id}
              ref={(calendarRef) =>
                calendarRef &&
                intersectionObserverRef.current &&
                intersectionObserverRef.current.observe(calendarRef)
              }
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center adminCalendarBody">
                <NavLink
                  to={`/calendar/${calendar.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    src={calendar.imageUrl || defaultScreenshot}
                    data-src={calendar.imageUrl}
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
