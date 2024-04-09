import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.createpassword.value;
    createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="mainContent registerContainer">
      <div className="registerFormWrap">
        <h3 className="h3Register">Register</h3>
        <form onSubmit={handleSubmit}>
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
            <input type="password" name="createpassword" id="createpassword" />
          </div>
          <Button type="submit" className="registerBtn">
            Register
          </Button>
        </form>
        <p className="termsConditions">
          By clicking the register button, you agree to our{" "}
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </p>
      </div>
    </div>
  );
}
