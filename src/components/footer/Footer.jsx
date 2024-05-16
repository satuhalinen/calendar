import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const { id } = useParams();
  const location = useLocation();

  const adminFooterColor = [
    "/",
    "/adminpanel",
    "/admin-calendars",
    "/create-calendar",
    "/edit-calendar",
    "/calendar",
    `/calendar/${id}`,
    `/modify-old-calendar-styling/${id}`,
    `/modify-old-calendar/${id}`,
    "/user-management",
    "/customer-messages",
    "/login",
    "/register",
    "/about",
    "/terms-and-conditions",
    "/contact",
  ];
  const isAdminRoute = adminFooterColor.includes(location.pathname);

  return (
    <footer className={isAdminRoute ? "footerAdmin" : "footerDefault"}>
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start">
            <Nav className="socialMedia">
              <Nav.Item className="socialLinks">
                <Nav.Link
                  href="https://www.facebook.com/"
                  alt="Facebook"
                  target="_blank"
                >
                  <FaFacebookF />
                </Nav.Link>
                <Nav.Link
                  href="https://www.instagram.com/"
                  alt="Instagram"
                  target="_blank"
                >
                  <FaInstagram />
                </Nav.Link>
                <Nav.Link
                  href="https://www.twitter.com/"
                  alt="Twitter"
                  target="_blank"
                >
                  <FaTwitter />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={4} className="text-center">
            <p className="copyright">© 2024 VOCA</p>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <Nav className="termsAndContact">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/terms-and-conditions">
                  Terms and Conditions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
