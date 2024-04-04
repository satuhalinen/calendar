import { useState } from "react";
import PopUp from "../../components/popUp/PopUp.jsx";
import ImageCarousel from "../../components/imageCarousel/ImageCarousel.jsx";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../landingPage/landingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [expandedStates, setExpandedStates] = useState({
    version1: false,
    version2: false,
  });

  const handleExpand = (version) => {
    setExpandedStates({
      ...expandedStates,
      [version]: !expandedStates[version],
    });
  };

  return (
    <Col className="landing-container">
      <PopUp showInitially={!showPopup} handleClose={handleClosePopup} />
      <ImageCarousel />
      <Col className="versions-wrap">
        <h2 className="versionTitle">Discover our different versions</h2>
        <Row className="versions">
          <Col md={6}>
            <Card className="versionCard">
              <Card.Header className="versionCardTitle">Version 1</Card.Header>
              <Card.Body className="versionCardBody">
                <Card.Text>
                  Version 1 is the first version of our calendar.
                </Card.Text>
                {expandedStates.version1 && (
                  <Col className="expandedCard">
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <Button
                      className="readMore"
                      variant="link"
                      onClick={() => handleExpand("version1")}
                    >
                      Read less
                    </Button>
                  </Col>
                )}
                {!expandedStates.version1 && (
                  <Button
                    className="readMore"
                    variant="link"
                    onClick={() => handleExpand("version1")}
                  >
                    Read more
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="versionCard">
              <Card.Header className="versionCardTitle">Version 2</Card.Header>
              <Card.Body className="versionCardBody">
                <Card.Text>
                  Version 2 is the second version of our calendar.
                </Card.Text>
                {expandedStates.version2 && (
                  <Col className="expandedCard">
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <p>Additional text when expanded.</p>
                    <Button
                      className="readMore"
                      variant="link"
                      onClick={() => handleExpand("version2")}
                    >
                      Read less
                    </Button>
                  </Col>
                )}
                {!expandedStates.version2 && (
                  <Button
                    className="readMore"
                    variant="link"
                    onClick={() => handleExpand("version2")}
                  >
                    Read more
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Link to="/register">
          <Button className="registerNow">Register now</Button>
        </Link>
      </Col>
      <Col className="aboutUs">
        <Card className="aboutUsCard">
          <Card.Header className="aboutUsTitle">About VOCA</Card.Header>
          <Card.Body className="aboutUsBody">
            <Card.Text>Here some information about us.</Card.Text>
            <Card.Text>Some text here.</Card.Text>
            <Card.Text>Some text here.</Card.Text>
            <Card.Text>Some text here.</Card.Text>
            <Link to="/about" className="linkToAbout">
              <Card.Text>Read more about us.</Card.Text>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Col>
  );
};

export default LandingPage;
