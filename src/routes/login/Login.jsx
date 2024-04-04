import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="container">
        <div className="formWrap">
          <form>
            <h3 className="h3Login">Log in</h3>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
            </div>
            <Button type="submit">Log in</Button>
            <p>
              Don't have an account? <Link to="/register">Sign up</Link> now.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
