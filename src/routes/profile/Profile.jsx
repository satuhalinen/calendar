import Card from "react-bootstrap/Card";
import { NavLink, Link } from "react-router-dom";
import homeSymbol from "../../../images/home.png";

export default function Profile() {
  return (
    <>
      <div className="profileInfo">
        <h3 className="h3Profile">Profile</h3>
        <NavLink style={{ textDecoration: "none" }}>
          <Card.Img variant="top" src={homeSymbol} />
        </NavLink>
        <p>name</p>
        <p>email</p>
        <Link to="/account-settings"> account settings</Link>
      </div>
      <h3 className="h3savedCalendars">Saved calendars</h3>
      <div className="cards">
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 1</Card.Title>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 2</Card.Title>
          </Card.Body>
        </Card>
        <Card className="card">
          <NavLink style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={homeSymbol} />
          </NavLink>
          <Card.Body>
            <Card.Title>Calendar 3</Card.Title>
          </Card.Body>
        </Card>
        <Link to="/favorites"> See all of your favorites</Link>
      </div>
    </>
  );
}
