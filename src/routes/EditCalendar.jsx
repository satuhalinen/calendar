import EditHatch from "../components/editHatch/EditHatch";
import "../calendar.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SmallHeader from "../components/smallHeader/SmallHeader";

function EditCalendar() {
  return (
    <>
      <SmallHeader />
      <div style={{ display: "grid" }} className="editCalendar">
        <Card.Title
          style={{
            textAlign: "center",
            margin: "3% 0% 0% 0%",
            fontSize: "40px",
          }}
        >
          Edit Calendar
        </Card.Title>
        <div className="calendarSections" style={{ display: "flex" }}>
          <Card className="calendar" style={{ margin: "2%" }}>
            {Array.from({ length: 31 }).map((_, i) => (
              <EditHatch key={i} number={i + 1} />
            ))}
          </Card>
        </div>
        <Button
          style={{
            width: "20%",
            justifySelf: "center",
            backgroundColor: "#BA6C2C",
            color: "#FFFAF7",
            border: "none",
            margin: "0% 0% 2% 0%",
          }}
        >
          Save calendar
        </Button>
      </div>
    </>
  );
}

export default EditCalendar;
