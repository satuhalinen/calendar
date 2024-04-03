import Card from "react-bootstrap/Card";
import { NavLink } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import homeSymbol from "../../public/home.png";

export default function Favorites() {
  return (
    <>
      <h3 className="h3Favorites">Favorites</h3>
      <div className="cards">
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 1</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 2</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 3</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 4</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 5</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 6</Card.Title>
            <Button variant="primary">Remove</Button>
          </Card.Body>
        </Card>
        <Button variant="primary">Remove all</Button>
      </div>
    </>
  );
}
