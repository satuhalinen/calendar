import { Card, Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./Calendars.css";
import useCalendarData from "../../hooks/useCalendarData";
import useMyCalendarData from "../../hooks/useMyCalendarData";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";

export default function Calendars() {
  const { loading, calendars, intersectionObserverRef } = useCalendarData();
  const [search, setSearch] = useState("");
  const myCalendarData = useMyCalendarData();
  const myCalendars = myCalendarData ? myCalendarData.myCalendars : [];
  console.log("myCalendars:", myCalendars);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const calendarsWithMyCalendarsInfo = calendars.map((calendar) => ({
    ...calendar,
    isInMyCalendars: myCalendars.some(
      (myCalendar) => myCalendar.id === calendar.id
    ),
  }));

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This calendar is in My Calendars.
    </Tooltip>
  );

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
                  </NavLink>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <NavLink
                      to={`/calendar/${calendar.id}`}
                      className="linkToOneCalendar"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        className="useCalendarButton"
                        style={{
                          backgroundColor: "#BA6C2C",
                          border: "none",
                          color: "#F4EDE7",
                        }}
                      >
                        Preview
                      </button>
                    </NavLink>
                    {calendar.isInMyCalendars && (
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <button
                          className="inMyCalendarsButton"
                        >
                          <FaStar />
                        </button>
                      </OverlayTrigger>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        )}
      </Col>
    </Row>
  );
}
