import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import smallLogo from "../../assets/smallLogo.png";
import "./smallHeader.css";
import { Image } from "react-bootstrap";

function SmallHeader() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Navbar className="lightHeader">
      <Container>
        <NavLink to="/" className="logo-link">
          <Image
            src={smallLogo}
            width="auto"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </NavLink>
        <Nav className="me-auto">
          <NavLink className="smallHeaderLink" to="#" onClick={goBack}>
            Go Back
          </NavLink>
          <NavLink className="smallHeaderLink" to="/calendars">
            Calendars
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SmallHeader;