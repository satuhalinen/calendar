import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import smallLogo from "../../assets/smallLogo.png";
import logo2 from "../../assets/logo2.png";
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
            src={logo2}
            width="auto"
            height="50"
            className="d-inline-block align-top"
            alt="VOCA logo"
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
