import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Register from "../routes/Register";
import Login from "../routes/Login";
import About from "../routes/About";

export default function Header() {
  return (
    <header>
      <h1>Welcome to Our Advent Calender</h1>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#header">Header</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Register.Link href="#register">Register</Register.Link>
              <Login.Link href="#login">Login</Login.Link>
              <About.Link href="#About">About</About.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
