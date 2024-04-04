import Card from "react-bootstrap/Card";
import { NavLink } from "react-bootstrap";
import { Col, Row } from "react-bootstrap/esm";
import happySymbol from "../../assets/happy.svg";
import "../favorites/favorites.css";

export default function Favorites() {
  return (
    <Row className="mainContent userCalendarContainer">
      <Col xs={10} className="userCalendars">
        <p className="userCalendarTitle">Favorites</p>
        <div className="cards">
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
          <Card className="calendarCard d-flex flex-column justify-content-center align-items-center">
            <NavLink style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={happySymbol} />
            </NavLink>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title style={{ color: "black" }}>Calendar 1</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>);
}
