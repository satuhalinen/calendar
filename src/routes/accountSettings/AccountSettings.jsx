import { Container, Form, Button } from "react-bootstrap";
import "./accountSettings.css";
import { auth, db } from "../../auth/firebase";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export default function AccountSettings() {
  const location = useLocation();
  const docID = location.state?.docID;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCurrentEmail = (e) => {
    setCurrentEmail(e.target.value);
  };
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  useEffect(() => {
    if (alertMessage) {
      const timeoutId = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [alertMessage]);

  //update email, password and username function
  const user = auth.currentUser;
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(
        currentEmail,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, email);
      await updatePassword(user, password);
      if (currentEmail && currentPassword) {
        setPassError("");
        setEmailError("");
      }
      const userDocRef = doc(db, "users", docID);
      await updateDoc(userDocRef, {
        ...(name !== "" ? { fullname: name } : {}),
        ...(email !== "" ? { email: email } : {}),
      });
      setAlertMessage("Profile updated successfully");
      setName("");
      setEmail("");
      setPassword("");
      setCurrentEmail("");
      setCurrentPassword("");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setPassError("Incorrect password");
      } else if (error.code === "auth/user-mismatch") {
        setEmailError("Incorrect Email");
      } else {
        setPassError("fill in the field with valid password");
        setEmailError("fill in the field with valid email");
      }
    }
  };
  //delete account function
  const handelDelete = async (e) => {
    e.preventDefault();
    try {
      if (currentEmail !== "" && currentPassword !== "") {
        const credential = EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        await deleteDoc(doc(db, "users", docID));
      } else {
        setPassError("fill in the field with valid data");
        setEmailError("fill in the field with valid data");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setPassError("Incorrect password");
      } else {
        setPassError("An error occurred while deleting the account");
      }
    }
  };

  return (
    <Container
      id="main-container"
      className="mainContent d-flex justify-content-center align-items-center "
    >
      <div style={{ position: "absolute" }}>
        {alertMessage && (
          <Alert
            variant="success"
            onClose={() => setAlertMessage("")}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
      </div>
      <Container id="form-container" className="text-center">
        <p className="accsetCAL-h1">Account Settings</p>
        <Form className="accountForm">
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formUsername"
          >
            <Form.Label>Change name</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formEmail"
          >
            <Form.Label>Current Email</Form.Label>
            {emailError && (
              <p style={{ color: "red", fontSize: "10px", marginBottom: "0" }}>
                {emailError}
              </p>
            )}
            <Form.Control
              className="input-field"
              type="email"
              placeholder="Current Email"
              value={currentEmail}
              onChange={handleCurrentEmail}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formEmail"
          >
            <Form.Label>New Email</Form.Label>
            <Form.Control
              className="input-field"
              type="email"
              placeholder="New Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formPassword"
          >
            <Form.Label>Current password</Form.Label>
            {passError && (
              <p
                style={{
                  color: "red",
                  fontSize: "10px",
                  marginBottom: "0px",
                  marginLeft: "0",
                }}
              >
                {passError}
              </p>
            )}
            <Form.Control
              className="input-field"
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={handleCurrentPassword}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 formGroup-container"
            controlId="formPassword"
          >
            <Form.Label>Reset password</Form.Label>
            <Form.Control
              className="input-field"
              type="password"
              placeholder="New password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <div className="button-a-container">
            <Button
              variant="light"
              type="submit"
              className="mb-3 accsetCAL-button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <a
              href="#"
              className="text-danger accsetCAL-a"
              onClick={handelDelete}
            >
              Delete Account
            </a>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
