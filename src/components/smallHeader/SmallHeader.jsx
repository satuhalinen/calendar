import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function SmallHeader() {
  return (
    <Navbar style={{ backgroundColor: "#f4ede7" }}>
      <Container>
        <Nav className="me-auto">
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/calendars"
          >
            Back to Calendars
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SmallHeader;
