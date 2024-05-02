import {
  Card,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./myCalendars.css";
import useCalendarData from "../../hooks/useCalendarData";

export default function MyCalendars() {
  const { loading, calendars, intersectionObserverRef } = useCalendarData();

  return (
    <Row className="mainContent userCalendarsWrap">
      <Col className="userCalendarsContainer">
        <p className="myCalendarsTitle">My calendars</p>
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
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div className="calendarGrid">
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
                <NavLink
                  to={`/calendar/${calendar.id}`}
                  className="linkToOneCalendar"
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    className="calendarCardImg"
                    src={calendar.imageUrl || defaultScreenshot}
                  />
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
        )}
      </Col>
    </Row>
  );
}
