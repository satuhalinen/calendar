import { Col, Container, Row } from "react-bootstrap";
import './about.css';

export default function About() {
  return (
    <Container className="about-container">
      <Col className="about-wrap">
        <Row>
          <h1 className="aboutTitle">About us</h1>
        </Row>
        <Row>
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
        </Row>
      </Col>
    </Container>
  );
}
