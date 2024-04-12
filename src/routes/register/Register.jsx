import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../auth/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { addDoc, collection } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";

export default function Register() {
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.createpassword.value;

    try {
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        setError("Email already in use");
        setInputError(true);
        return;
      }

      setInputError(false);

      await createUserWithEmailAndPassword(email, password);

      const currentUser = auth.currentUser;

      await addDoc(collection(db, "users"), {
        uid: currentUser.uid,
        fullname: e.target.fullname.value,
        email: currentUser.email,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="mainContent registerContainer">
      <div className="registerFormWrap">
        <h3 className="h3Register">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="registerFormGroup">
            <label htmlFor="fullname">Full name:</label>
            <input
              type="text"
              name="fullname"
              placeholder="Name"
              id="fullname"
            />
          </div>
          <div className="registerFormGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={inputError ? "input-error input-shake" : ""}
              style={inputError ? { border: "2px solid red" } : {}}
            />
          </div>
          <div className="registerFormGroup">
            <label htmlFor="createpassword">Create password:</label>
            <input
              type="password"
              name="createpassword"
              placeholder="Password"
              id="createpassword"
            />
          </div>
          <Button type="submit" className="registerBtn">
            Register
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="termsConditions">
          By clicking the register button, you agree to our{" "}
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </p>
      </div>
    </div>
  );
}
