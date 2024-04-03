import { Card, Col, Row, Table } from "react-bootstrap";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import '../adminpanel/adminpanel.css';

export default function Adminpanel() {
  return (
    <Row>
      <Col xs={2}>
        <Leftbar />
      </Col>
      <Col xs={10}>
        <h1 className="dashboardTitle">Dashboard</h1>
        <Row className="dataCards">
          <Col>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <Card.Title>User Data</Card.Title>
                <Card.Text>
                  Some data here.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <Card.Title>Sessions</Card.Title>
                <Card.Text>
                  Some data here.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <Card.Title>Other Data</Card.Title>
                <Card.Text>
                  Some data here.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="users">
          <Col>
            <Card className="usersCard">
              <Card.Header className="usersCardHeader">Users</Card.Header>
              <Table className="usersTable" striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Ben</td>
                    <td>ben@example.com</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Satu</td>
                    <td>satu@example.com</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Hend</td>
                    <td>hend@example.com</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Pushpa</td>
                    <td>pushpa@example.com</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Pinja</td>
                    <td>pinja@example.com</td>
                    <td>Admin</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}