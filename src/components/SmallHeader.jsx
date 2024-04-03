import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function SmallHeader() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <NavLink style={{ textDecoration: "none" }} to="/calendars">
            Back to Calendars
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SmallHeader;
