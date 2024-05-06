import { Card, Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./myCalendars.css";
import useMyCalendarData from "../../hooks/useMyCalendarData";

export default function MyCalendars() {
  const { loading, myCalendars, intersectionObserverRef } = useMyCalendarData();

  return (
    <Row className="mainContent userCalendarsWrap">
      <Col className="userCalendarsContainer">
        <p className="myCalendarsTitle">My calendars</p>
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div className="calendarGrid">
            {myCalendars.map((calendar) => (
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
