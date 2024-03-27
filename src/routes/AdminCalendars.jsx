import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import homeSymbol from "./public/home.png";
import { NavLink } from "react-bootstrap";

export default function AdminCalendars() {
  return (
    <div className="adminCalendars">
      <div className="dropDowns">
        <div className="price">
          <DropdownButton id="dropdown-item-button" title="Select free or paid">
            <Dropdown.Item as="button">Free</Dropdown.Item>
            <Dropdown.Item as="button">Paid</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="topic">
          <DropdownButton id="dropdown-item-button" title="Choose topic">
            <Dropdown.Item as="button">Adults</Dropdown.Item>
            <Dropdown.Item as="button">Animals</Dropdown.Item>
            <Dropdown.Item as="button">Children and teenagers</Dropdown.Item>
            <Dropdown.Item as="button">Elderly</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="cards">
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 1</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 2</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 3</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 4</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 5</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 6</Card.Title>
            <Button variant="primary">Modify</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
