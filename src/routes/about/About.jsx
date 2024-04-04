import { Col, Container, Image, Row } from "react-bootstrap";
import './about.css';
import carousel1 from '../../assets/carousel1.jpeg';

export default function About() {
  return (
    <Container className="maincontent about-container">
      <Col className="about-wrap">
        <Row>
          <h1 className="aboutTitle">About us</h1>
        </Row>
        <Row>
          <Col>
            <Image
              src={carousel1}
              width="auto"
              height="300"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Col>
          <Col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              vestibulum, nunc nec ultricies ultricies, nunc nunc ultricies ultricies,
              nunc nunc ultricies ultricies, nunc nunc ultricies ultricies, nunc nunc
              ultricies ultricies, nunc nunc ultricies ultricies, nunc nunc ultricies
              ultricies, nunc nunc ultricies ultricies, nunc nunc ultricies ultricies,
              nunc nunc ultricies ultricies, nunc nunc ultricies ultricies, nunc nunc
              ultricies ultricies, nunc nunc ultricies ultricies, nunc nunc ultricies
              ultricies, nunc nunc ultricies ultricies, nunc nunc ultricies ultricies,
              nunc nunc ultricies ultricies, nunc nunc ultricies ultricies, nunc nunc
            </p>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
