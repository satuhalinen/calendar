import { Card, Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./Calendars.css";
import useCalendarData from "../../hooks/useCalendarData";
import useMyCalendarData from "../../hooks/useMyCalendarData";

export default function Calendars() {
  const { loading, calendars, intersectionObserverRef } = useCalendarData();
  const myCalendarData = useMyCalendarData();
  const [search, setSearch] = useState("");
  const myCalendars = myCalendarData ? myCalendarData.myCalendars : [];
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const calendarsWithMyCalendarsInfo = calendars.map((calendar) => ({
    ...calendar,
    isInMyCalendars: myCalendars.some(
      (myCalendar) => myCalendar.id === calendar.id
    ),
  }));
  return (
    <Row className="mainContent userCalendarsWrap">
      <Col className="userCalendarsContainer">
        <p className="calendarsTitle">Calendars</p>
        <div className="search-input">
          <input
            type="text"
            className="search-field"
            placeholder="Search By Title"
            onChange={searchHandler}
          />
        </div>
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div className="calendarGrid">
            {calendarsWithMyCalendarsInfo
              .filter((calendarItem) =>
                calendarItem.calendarTitle
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((calendar) => (
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
                      {calendar.isInMyCalendars
                        ? "Remove from my calendars"
                        : "Use calendar"}
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
