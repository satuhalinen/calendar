import { Card } from "react-bootstrap";
import "./Calendars.css";
import { Button } from "react-bootstrap";

export default function Calendars() {
  return (
    <div className="maincontent">
      <div>
        <Button
          style={{
            width: "100px",
            justifySelf: "left",
            backgroundColor: "#BA6C2C",
            color: "white",
            border: "none",
          }}
          className="select"
        >
          Select free or paid
        </Button>
      </div>
      <div>
        <Button
          style={{
            width: "50px",
            justifySelf: "right",
            backgroundColor: "#BA6C2C",
            color: "white",
            border: "none",
          }}
          className="sort"
        >
          Sort
        </Button>
      </div>

      <Card className="calendars">Calendars</Card>
      <div className="calendersh2">
        <h2>Calendars</h2>
      </div>
    </div>
  );
}
