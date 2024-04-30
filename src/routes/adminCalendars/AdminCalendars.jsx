import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import useCalendarData from "../../hooks/useCalendarData";
import "../adminCalendars/adminCalendars.css";
import "../adminpanel/adminpanel.css";
import Spinner from "react-bootstrap/Spinner";

export default function AdminCalendars() {
  const { loading, calendars, intersectionObserverRef } = useCalendarData();
  const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Row className="mainContent adminCalendarsContainer">
      <Col xs={2} className="leftBarCol">
        <Leftbar />
      </Col>
      <Col xs={9} className="adminCalendars">
        <p className="adminCalendarTitle">Calendars</p>
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
          <div className="adminCalendarCards">
            {calendars
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
        )}
      </Col>
    </Row>
  );
}
