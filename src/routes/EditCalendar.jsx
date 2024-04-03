import EditHatch from "../components/editHatch/EditHatch";
import "../calendar.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SmallHeader from "../components/SmallHeader";

function EditCalendar() {
  return (
    <>
      <SmallHeader />
      <div style={{ display: "grid" }} className="editCalendar">
        <Card.Title style={{ textAlign: "center" }}>Edit Calendar</Card.Title>
        <div className="calendarSections" style={{ display: "flex" }}>
          <div className="calendar" style={{ border: "1px solid black" }}>
            {Array.from({ length: 31 }).map((_, i) => (
              <EditHatch key={i} number={i + 1} />
            ))}
          </div>
        </div>
        <Button
          style={{
            width: "20%",
            justifySelf: "center",
            backgroundColor: "#BA6C2C",
            color: "black",
            border: "none",
          }}
        >
          Edit calendar
        </Button>
      </div>
    </>
  );
}

export default EditCalendar;
