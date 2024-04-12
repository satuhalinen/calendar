import Hatch from "../components/hatch/Hatch.jsx";
import "../calendar.css";
import { Card } from "react-bootstrap";
import happySymbol from "../assets/happy.svg";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";

function Calendar() {
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
