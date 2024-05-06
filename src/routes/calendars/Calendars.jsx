import { Card, Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./Calendars.css";
import useCalendarData from "../../hooks/useCalendarData";
import useMyCalendarData from "../../hooks/useMyCalendarData";
import { useDispatch } from "react-redux";
import { saveToMyCalendar } from "../../store/scoreSlice";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Calendars() {
  const [refresh, setRefresh] = useState(false);
  const { loading, calendars, intersectionObserverRef } = useCalendarData();
  const myCalendarData = useMyCalendarData(refresh);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
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

  const removeMyCalendarClick = async (id) => {
    dispatch(saveToMyCalendar(false));
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    const docId = document.id;
    const calendarRef = doc(db, "users", docId, "myCalendars", id);
    await deleteDoc(calendarRef);
    setRefresh(!refresh);
  };

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
                  {calendar.isInMyCalendars ? (
                    <div
                      className="linkToOneCalendar"
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        className="calendarCardImg"
                        src={calendar.imageUrl || defaultScreenshot}
                      />
                      <button
                        onClick={() => removeMyCalendarClick(calendar.id)}
                        className="useCalendarButton"
                        style={{
                          backgroundColor: "#BA6C2C",
                          border: "none",
                          color: "#F4EDE7",
                        }}
                      >
                        Remove from my calendars
                      </button>
                    </div>
                  ) : (
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
                  )}
                </Card>
              ))}
          </div>
        )}
      </Col>
    </Row>
  );
}
