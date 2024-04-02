import Nav from "react-bootstrap/Nav";
import { Columns, Calendar, Calendar2, Person } from "react-bootstrap-icons";
import "./leftbar.css";

export default function Leftbar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column navMain">
      <Nav.Item className="mb-4 ml-5 d-flex align-items-center">
        <Nav.Link href="/home" className="d-flex align-items-center navLink">
          <Columns size={20} className="me-2" style={{ color: "black" }} />
          <span>Dashboard</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link eventKey="link-1" className="d-flex align-items-center linki">
          <Calendar size={20} className="me-2" style={{ color: "black" }} />
          <span>Create a calendar</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link eventKey="link-2" className="d-flex align-items-center linki">
          <Calendar2 size={20} className="me-2" style={{ color: "black" }} />
          <span>Calendar</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link eventKey="link-4" className="d-flex align-items-center linki">
          <Person size={20} className="me-2" style={{ color: "black" }} />
          <span>My profile</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
