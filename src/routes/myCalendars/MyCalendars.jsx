import { Card, Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import "./myCalendars.css";
import useMyCalendarData from "../../hooks/useMyCalendarData";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../auth/firebase";
import { saveToMyCalendar } from "../../store/scoreSlice";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import { LuMinusCircle } from "react-icons/lu";

export default function MyCalendars() {
  const [removed, setRemoved] = useState(false);
  const { loading, myCalendars, intersectionObserverRef } =
    useMyCalendarData(removed);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const removeMyCalendarClick = async (id) => {
    dispatch(saveToMyCalendar(false));
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    const docId = document.id;
    const calendarRef = doc(db, "users", docId, "myCalendars", id);
    await deleteDoc(calendarRef);
    setRemoved(!removed);
  };

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
                      Use calendar
                    </button>
                  </NavLink>

                  <button
                    onClick={() => removeMyCalendarClick(calendar.id)}
                    className="useCalendarButton"
                    style={{
                      backgroundColor: "#BA6C2C",
                      border: "none",
                      color: "#F4EDE7",
                      height: "52%",
                    }}
                  >
                    <LuMinusCircle />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
}