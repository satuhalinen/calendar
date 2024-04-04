import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  return (
    <>
      <div className="registerContainer">
        <h3 className="h3Register">Register</h3>
        <div className="registerFormWrap">
          <form>
            <div className="registerFormGroup">
              <label htmlFor="fullname">Full name:</label>
              <input type="text" name="fullname" id="fullname" />
            </div>
            <div className="registerFormGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="registerFormGroup">
              <label htmlFor="createpassword">Create password:</label>
              <input
                type="password"
                name="createpassword"
                id="createpassword"
              />
            </div>
            <Button className="registerBtn">Register</Button>
          </form>
          <p className="termsConditions">
            By clicking the register button, you agree to our{" "}
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </>
  );
}
