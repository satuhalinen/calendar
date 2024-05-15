import { useState } from "react";
import PopUp from "../../components/popUp/PopUp.jsx";
import HeroBanner from "../../components/heroBanner/HeroBanner.jsx";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import exampleCalendar4 from "../../assets/exampleCalendar4.png";
import exampleCalendar5 from "../../assets/exampleCalendar5.png";
import exampleCalendar6 from "../../assets/exampleCalendar6.png";
import "./landingPage.css";
import ChatBot from "../../components/chatBot/ChatBot.jsx";
import { FaUserEdit, FaPalette, FaGift, FaHandsHelping } from "react-icons/fa";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseChatBot = () => {
    setShowChatBot(false);
  };

  const [expandedStates, setExpandedStates] = useState({
    version1: true,
    version2: true,
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
      <HeroBanner />
      <Row className="calendarCreationExplanation">
        <h2>How It Works</h2>
        <Col className="step">
          <FaUserEdit />
          <p>Register and start creating your own unique vision of an advent calendar.</p>
        </Col>
        <Col className="step">
          <FaPalette />
          <p>Customize colors, backgrounds, and content behind each hatch.</p>
        </Col>
        <Col className="step">
          <FaGift />
          <p>Choose hatch categories and assign charitable activities to each hatch.</p>
        </Col>
        <Col className="step">
          <FaHandsHelping />
          <p>Share your calendars with other users and spread the joy of kindness.</p>
        </Col>
      </Row>
      <Col className="versions-wrap">
        <h2 className="versionTitle">Create your own inspiring calendar</h2>
        <Row className="versions">
          <Col md={6}>
            <Card className="versionCard">
              <Card.Header className="versionCardTitle">Creation</Card.Header>
              <Card.Body className="versionCardBody">
                <Card.Text>
                  <b>Dive into the world of calendar creation:</b>
                </Card.Text>
                {expandedStates.version1 && (
                  <Col className="expandedCard">
                    <p className="pLanding">
                      After registering, you can start putting together your own
                      unique vision of an advent calendar.
                    </p>
                    <p className="pLanding">
                      We offer you the tools to customize multiple aspects of
                      your powerful calendar including the number of hatches,
                      colors & backgrounds, and the content behind each hatch.
                    </p>
                    <p className="pLanding">
                      Choose between multiple hatch categories including
                      children, animals and the elderly.
                    </p>
                    <p className="pLanding">
                      You can then choose from a plethora of different
                      charitable activities, of course unique to each hatch!.
                    </p>
                    <p className="pLanding">
                      On a budget? Don't worry, there are plenty of options that
                      lets you roll up your sleeves and contribute to the good
                      of the world - no funds needed.
                    </p>
                    <p className="pLanding">
                      After creation, you can share your calendars with other
                      users for them to use, thus spreading the joy of kindness
                      around! Are you ready to make your calendar a reality?
                      Join us!
                    </p>
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
              <Card.Header className="versionCardTitle">Usage</Card.Header>
              <Card.Body className="versionCardBody">
                <Card.Text>
                  <b>More than just a good gift idea:</b>
                </Card.Text>
                {expandedStates.version2 && (
                  <Col className="expandedCard">
                    <p className="pLanding">
                      Our fun & engaging calendar software will track the users
                      progress as they open and complete hatches, and reward
                      them with fun little design changes as they progress
                      through their charity journey.
                    </p>
                    <p className="pLanding">
                      All our hatch content is real and meaningful, thus the
                      user will create a real, postive change in their community
                      with each hatch completed.
                    </p>
                    <p className="pLanding">
                      Using our calendars contributes positively to those in our
                      society who needs it the most, animal or human - we don't
                      discriminate.
                    </p>
                    <p className="pLanding">
                      As a user you yourself will feel the joy that is giving,
                      in your heart.
                    </p>
                    <p className="pLanding">
                      Whether you want to create your own calendar, or simply
                      browse and use calendars made by others, you have come to
                      the right place.
                    </p>
                    <p className="pLanding">
                      Register now, and start spreading kindness, one hatch at a
                      time!
                    </p>
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
          <button className="registerNow">Register now</button>
        </Link>
      </Col>
      <Row className="calendarBannerRow">
        <h2 className="calendarBannerTitle">Choose your own style</h2>
        <Row className="calendarImageBanner">
          <img src={exampleCalendar4} alt="exampleCalendar4" className="exampleCalendar" />
          <img src={exampleCalendar5} alt="exampleCalendar5" className="exampleCalendar" />
          <img src={exampleCalendar6} alt="exampleCalendar6" className="exampleCalendar" />
        </Row>
      </Row>
      <Col className="aboutUs">
        <Card className="aboutUsCard">
          <Card.Header className="aboutUsTitle">Who are we?</Card.Header>
          <Card.Body className="aboutUsBody">
            <Card.Text>Brightening the world is our mission.</Card.Text>
            <Card.Text>Calendars are our tools.</Card.Text>
            <Card.Text>Facilitating real change is our passion.</Card.Text>
            <Card.Text>
              We are VOCA - spreading kindness, one hatch at a time.
            </Card.Text>
            <Link to="/about" className="linkToAbout">
              <Card.Text>Read more about us.</Card.Text>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Row>
        <ChatBot showInitially={!showChatBot} handleClose={handleCloseChatBot} />
      </Row>
    </Col>
  );
};

export default LandingPage;
