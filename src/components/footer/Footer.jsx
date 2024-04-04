/*import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import icons
import './footer.css';

const Footer = () => {
  const location = useLocation();

  const adminFooterColor = [
    "/",
    "/adminpanel",
    "/admin-calendars",
    "/create-calendar",
    "/edit-calendar",
  ];
  const isAdminRoute = adminFooterColor.includes(location.pathname);

  return (
    <footer className={isAdminRoute ? "footerAdmin" : "footerDefault"}>
      <Container>
        <Row>
          <Col>
            <Nav className="socialMedia">
              <Nav.Item>
                <p className="socialMediaTitle">Social Media Links</p>
              </Nav.Item>
              <Nav.Item className="socialLinks">
                <Nav.Link href="https://www.facebook.com/" target="_blank">
                  <FaFacebookF />
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com/" target="_blank">
                  <FaInstagram />
                </Nav.Link>
                <Nav.Link href="https://www.twitter.com/" target="_blank">
                  <FaTwitter />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="text-center">
            <p className="copyright">Copyright</p>
          </Col>
          <Col className="termsLinks">
            <Nav className="termsAndContact">
              <Nav.Item>
                <Nav.Link as={Link} to="/terms-and-conditions">
                  Terms and Conditions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/about">
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

export default Footer;*/
