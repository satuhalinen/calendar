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
            VOCA - Spread kindness, one hatch at a time!
          </h1>
        </Row>
        <Row>
          <Col>
            <Image
              src={fjellteam}
              tabIndex="0"
              width="540"
              height="330"
              className="sunsetImg"
              alt="Two people helping a third person scale a mountain, sun setting in the background"
            />
            <h3 className="ourTeam">Our team</h3>
            <Container className="teamContainer">
              <Row className="aboutUsTeam">
                <Image className="teamImg" src={satu}></Image>
                <Image className="teamImg" src={ben}></Image>
                <Image className="teamImg" src={pinja}></Image>
              </Row>
              <div className="paragraphContainer">
                <p className="paragraph">
                  <strong>
                    <span className="ourTeamSpan1" style={{ fontSize: "15px" }}>
                      Satu Halinen
                    </span>
                  </strong>
                  <br />
                  <span className="ourTeamSpan2" style={{ fontSize: "15px" }}>
                    Developer
                  </span>
                </p>
                <p className="paragraph">
                  <strong>
                    <span className="ourTeamSpan3" style={{ fontSize: "15px" }}>
                      Bendik Pettersen
                    </span>
                  </strong>
                  <br />
                  <span className="ourTeamSpan4" style={{ fontSize: "15px" }}>
                    Developer
                  </span>
                </p>
                <p className="paragraph">
                  <strong>
                    <span className="ourTeamSpan5" style={{ fontSize: "15px" }}>
                      Pinja Alanne
                    </span>
                  </strong>
                  <br />
                  <span className="ourTeamSpan6" style={{ fontSize: "15px" }}>
                    Developer
                  </span>
                </p>
              </div>

              <Row className="aboutUsTeam1">
                <Image className="teamImg" src={pushpa}></Image>
                <Image className="teamImg" src={avatar}></Image>
              </Row>
              <div className="paragraphContainer">
                <p className="paragraph">
                  <strong>
                    <span className="ourTeamSpan7" style={{ fontSize: "15px" }}>
                      Pushpa Gnyawali
                    </span>
                  </strong>
                  <br />
                  <span className="ourTeamSpan8" style={{ fontSize: "15px" }}>
                    Developer
                  </span>
                </p>
                <p className="paragraph">
                  <strong>
                    <span className="ourTeamSpan9" style={{ fontSize: "15px" }}>
                      Hend Missonen
                    </span>
                  </strong>
                  <br />
                  <span className="ourTeamSpan10" style={{ fontSize: "15px" }}>
                    Developer
                  </span>
                </p>
              </div>
            </Container>
          </Col>

          <Col>
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
              We <b>welcome you</b> to be a part of our journey to make the
              world a better place, one calendar at a time.{" "}
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
