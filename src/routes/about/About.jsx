import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./about.css";
import fjellteam from "../../assets/fjellteam.png";
import avatar from "../../assets/avatar.png";
import satu from "../../assets/Satu.jpeg";
import ben from "../../assets/Ben.png";
import pinja from "../../assets/Pinja.jpeg";
import pushpa from "../../assets/Pushpa.jpg";

export default function About() {
  return (
    <Container className="mainContent about-container">
      <Col className="about-wrap">
        <Row>
          <h1 tabIndex="0" className="aboutTitle">
            About us
          </h1>
        </Row>
        <Row>
          <Col>
            <Image
              src={fjellteam}
              tabIndex="0"
              width="540"
              height="330"
              className="d-inline-block align-top"
              alt="Two people helping a third person scale a mountain, sun setting in the background"
            />
            <h3 className="ourTeam">Our team</h3>
            <Container className="teamContainer">
              <Row className="aboutUsTeam">
                <Image className="teamImg" src={satu}></Image>
                <Image className="teamImg" src={ben}></Image>
                <Image className="teamImg" src={pinja}></Image>
              </Row>
              <Row className="aboutUsTeam1">
                <Image className="teamImg" src={pushpa}></Image>
                <Image className="teamImg" src={avatar}></Image>
              </Row>
            </Container>
          </Col>

          <Col>
            <h4 tabIndex="0" className="aboutH4">
              VOCA - Spread kindness, one hatch at a time!
            </h4>
            <br />
            <p tabIndex="0" className="aboutP">
              Here at VOCA we believe in the good of the world! We are a diverse
              team consisting of five passionate full-stack web-developer
              students dedicated to creating innovative solutions for social
              good. Our project began with a simple idea: to offer advent-style
              calendar creation as a service, but with a twist. With our
              platform, users can create personalized calendars that encourage
              acts of kindness and generosity throughout the holiday season and
              beyond. <br />
              <br />
              From donating to organizations supporting various causes to
              volunteering in your community, our calendars inspire meaningful
              acts that benefit others. Each hatch in our calendars is
              customizable, allowing users to tailor the content to specific
              categories such as children, animals, or the elderly, and select
              between different ways of helping, like through donations or
              hands-on assistance. <br />
              <br />
              Whether you want a calendar for personal or gift purposes, or
              you're representing a business or organization looking to spread
              kindness with us, we welcome you to join our community and create
              a calendar that fits your needs. <br />
              <br />
              <b>Thank you</b> for being a part of our journey to make the world
              a better place, one calendar at a time.{" "}
              <Link to="/register">
                <b>Join us</b>
              </Link>
              , and let's create a ripple of kindness together.
            </p>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
