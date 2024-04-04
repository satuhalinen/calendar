import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="maincontent">

      <div className="loginContainer">
        <div className="loginFormWrap">
          <form>
            <h3 className="h3Login">Log in</h3>
            <div className="loginFormGroup">

              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="loginFormGroup">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
            </div>
            <Button className="loginBtn">Log in</Button>
            <p className="noAccount">
              Don't have an account? <Link to="/register">Sign up</Link> now.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
