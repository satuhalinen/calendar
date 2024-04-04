import { Container, Form, Button } from "react-bootstrap";
import "./accountSettings.css";

export default function AccountSettings() {
  return (
    <Container
      id="main-container"
      className="d-flex justify-content-center align-items-center "
    >
      <Container id="form-container" className="text-center">
        <h1 className="accsetCAL-h1">Account Settings</h1>
        <Form>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formUsername"
          >
            <Form.Label>Change name</Form.Label>
            <Form.Control id="input-field" type="text" placeholder="name" />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formEmail"
          >
            <Form.Label>Change Email</Form.Label>
            <Form.Control id="input-field" type="email" placeholder="email" />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formPassword"
          >
            <Form.Label>Reset password</Form.Label>
            <Form.Control
              id="input-field"
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <div className="button-a-container">
            <Button
              variant="light"
              type="submit"
              className="mb-3 accsetCAL-button"
            >
              Reset
            </Button>

            <a href="#" className="text-danger accsetCAL-a">
              Delete Account
            </a>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
