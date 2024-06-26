import {
  Card,
  Row,
  Col,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./Calendars.css";
import useCalendarData from "../../hooks/useCalendarData";
import useMyCalendarData from "../../hooks/useMyCalendarData";
import { FaStar } from "react-icons/fa";

export default function Calendars() {
  const { loading, calendars, intersectionObserverRef } = useCalendarData();
  const [search, setSearch] = useState("");
  const myCalendarData = useMyCalendarData();
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

  const renderTooltip = (props) => (
    <Tooltip className="tooltip-1" {...props}>
      This calendar is in My Calendars.
    </Tooltip>
  );

  return (
    <Row className="mainContent userCalendarsWrap">
      <Col className="userCalendarsContainer">
        <p className="calendarsTitle">Calendars</p>
        <div className="calendars-search-input">
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
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center calendarBody">
                    <Card.Title className="calendarCardTitle">
                      {calendar.calendarTitle}
                    </Card.Title>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
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
                          <button className="inMyCalendarsButton">
                            <FaStar />
                          </button>
                        </OverlayTrigger>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>
        )}
      </Col>
    </Row>
  );
}
