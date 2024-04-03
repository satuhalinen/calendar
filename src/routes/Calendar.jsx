import Hatch from "../components/hatch/Hatch.jsx";
import "../calendar.css";
import { Card } from "react-bootstrap";
import homeSymbol from "../public/home.png";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";

function Calendar() {
  return (
    <>
      <SmallHeader />
      <Card.Title style={{ textAlign: "center" }}>Calendar</Card.Title>
      <div className="calendarSections" style={{ display: "flex" }}>
        <Card className="calendar">
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
          }}
        >
          <Card.Body>
            <Card.Title>Gamification</Card.Title>
            <Card.Title>Score</Card.Title>
          </Card.Body>
          <Card.Img variant="top" src={homeSymbol} />
        </Card>
      </div>
    </>
  );
}

export default Calendar;
