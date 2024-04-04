import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useLocation } from "react-router-dom";
import smallLogo1 from "../../assets/smallLogo1.png";
import smallLogo2 from "../../assets/smallLogo2.png";
import "./smallHeader.css"
import { Image } from "react-bootstrap";

function SmallHeader() {
  const location = useLocation();
  const lightHeaderColor = ['/calendar'];
  const isUserRoute = lightHeaderColor.includes(location.pathname);

  return (
    <Navbar className={isUserRoute ? "lightHeader" : "darkHeader"}>
      <Container>
        <Link to={isUserRoute ? "/calendars" : "/admin-calendars"} >
          <Image
            src={isUserRoute ? smallLogo2 : smallLogo1}
            width="auto"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Link>
        <Nav className="me-auto">
          <Nav.Link as={NavLink}
            className="smallHeaderLink"
            to={isUserRoute ? "/calendars" : "/admin-calendars"}
          >
            Back to Calendars
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar >
  );
}

export default SmallHeader;