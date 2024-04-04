import Nav from "react-bootstrap/Nav";

import "./leftbar.css";

export default function Leftbar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column navMain">
      <Nav.Item className="mb-4 ml-5 d-flex align-items-center">
        <Nav.Link
          href="/adminpanel"
          className="d-flex align-items-center navLink"
        >
          <span className="crCAL-span first">Dashboard</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          href="/create-calendar"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">Create a calendar</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          href="/admin-calendars"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">Calendar</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link href="/profile" className="d-flex align-items-center linki">
          <span className="crCAL-span">My profile</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
