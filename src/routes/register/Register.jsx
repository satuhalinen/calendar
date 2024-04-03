import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <h3 className="h3Register">Register</h3>
      <div className="container">
        <div className="formWrap">
          <form>
            <div className="formGroup">
              <label htmlFor="fullname">Full name:</label>
              <input type="text" name="fullname" id="fullname" />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="formGroup">
              <label htmlFor="createpassword">Create password:</label>
              <input
                type="password"
                name="createpassword"
                id="createpassword"
              />
            </div>
            <Button type="submit">Register</Button>
          </form>
          <p className="bottomText">
            By clicking the register button, you agree to our{" "}
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </>
  );
}
