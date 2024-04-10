import Hatch from "../components/hatch/Hatch.jsx";
import "../calendar.css";
import { Card } from "react-bootstrap";
import happySymbol from "../assets/happy.svg";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { showCalendarText } from "../store/alternativesSlice.js";

function Calendar() {
  const dispatch = useDispatch();

  const fetchContent = async () => {
    const docRef = doc(db, "calendars", "calendar");
    const docSnap = await getDoc(docRef);
    dispatch(showCalendarText(docSnap.data()));
  };

  useEffect(() => {
    (async () => {
      await fetchContent();
    })();
  }, []);

  return (
    <>
      <SmallHeader />
      <Card.Title
        style={{ textAlign: "center", margin: "2% 0% 0% 0%", fontSize: "32px" }}
      >
        Calendar
      </Card.Title>
      <div className="calendarSections" style={{ display: "flex" }}>
        <Card className="calendar" style={{ margin: "2% 2%" }}>
          {Array.from({ length: 31 }).map((_, i) => (
            <Hatch key={i} number={i + 1} />
          ))}
        </Card>
        <Card
          className="gamification"
          style={{
            display: "grid",
            width: "30%",
            height: "500px",
            margin: "5% 5% 5% 0%",
            justifyItems: "center",
          }}
        >
          <Card.Body>
            <Card.Title style={{ margin: "20% 0%" }}>
              See your score here!
            </Card.Title>
          </Card.Body>
          <Card.Img variant="top" src={happySymbol} style={{ width: "20%" }} />
        </Card>
      </div>
    </>
  );
}

export default Calendar;
