import Nav from "react-bootstrap/Nav";

import "./leftbar.css";
import { NavLink } from "react-router-dom";

export default function Leftbar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column navMain">
      <Nav.Item className="mb-4 ml-5 d-flex align-items-center">
        <Nav.Link
          as={NavLink}
          to="/adminpanel"
          className="d-flex align-items-center navLink"
        >
          <span className="crCAL-span first">Dashboard</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          as={NavLink}
          to="/create-calendar"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">Create a calendar</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          as={NavLink}
          to="/admin-calendars"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">Calendars</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          as={NavLink}
          to="/user-management"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">User Management</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4 d-flex align-items-center">
        <Nav.Link
          as={NavLink}
          to="/customer-messages"
          className="d-flex align-items-center linki"
        >
          <span className="crCAL-span">Customer Messages</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
