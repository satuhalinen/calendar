import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile.css";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  return (
    <>
      <Container className="profile-container">
        <Row className="profileInfo">
          <Col>
            <h3 className="h3Profile text-center">Profile</h3>
          </Col>
        </Row>
        <Col className="profileContent">
          <Row>
            <Col>
              <Image className="profileImg" src={avatar} />
            </Col>
            <Col className="profileText">
              <p>Name:</p>
              <p>Email:</p>
              <Link className="linkToAccount" to="/account-settings">
                <p className="linkToAccount">Account Settings</p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
      <h3 className="h3savedCalendars">Saved calendars</h3>
      <Container>
        <Row className="favoriteCards">
          <Col className="calendarCard profileCalendar">
            <p>Calendar 1</p>
          </Col>
          <Col className="calendarCard profileCalendar">
            <p>Calendar 2</p>
          </Col>
          <Col className="calendarCard profileCalendar">
            <p>Calendar 3</p>
          </Col>
        </Row>
        <Row>
          <Link className="linkToFavorites" to="/favorites">See all of your favorites</Link>
        </Row>
      </Container>
    </>
  );
}
