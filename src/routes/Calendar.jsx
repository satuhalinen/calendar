import Hatch from "../components/Hatch";
import "../calendar.css";
import { Card } from "react-bootstrap";
import homeSymbol from "../public/home.png";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";

function Calendar() {
  return (
    <>
      <SmallHeader />
      <div className="calendarSections" style={{ display: "flex" }}>
        <div className="calendar" style={{ border: "1px solid black" }}>
          {Array.from({ length: 31 }).map((_, i) => (
            <Hatch key={i} number={i + 1} />
          ))}
        </div>
        <Card
          className="gamification"
          style={{
            display: "grid",
            width: "30%",
            border: "1px solid black",
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
