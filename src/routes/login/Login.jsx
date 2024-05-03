import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../auth/firebase";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { addDoc, getDoc, doc, collection, getDocs } from "firebase/firestore";
import { Spinner } from "react-bootstrap";
import "./login.css";

export default function Login() {
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const [signInWithEmailAndPassword] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const adminUsers = usersSnapshot.docs.filter(
            (doc) => doc.data().isAdmin === true
          );
          const adminUserUids = adminUsers.map((doc) => doc.data().uid);
          const userIsAdmin = adminUserUids.includes(user.uid);
          setIsAdmin(userIsAdmin);
          console.log("Is admin:", userIsAdmin);

          if (userIsAdmin) {
            console.log("Navigating to admin panel...");
            navigate("/adminpanel");
          } else {
            console.log("Navigating to profile...");
            navigate("/profile");
          }
        } catch (error) {
          setLoading(false);
          console.error("Error checking admin status:", error);
        }
      } else {
        console.log("User data not available yet.");
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      let errorMessage;
      if (!email && !password) {
        errorMessage = "Error, fields are empty.";
      } else if (!email) {
        errorMessage = "Please type your email.";
      } else {
        errorMessage = "Please type your password.";
      }

      const newInputError = {
        email: !email,
        password: !password,
      };
      setError(errorMessage);
      setInputError(newInputError);
      return;
    }

    setInputError(false);

    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        const newInputError = {
          email: error.code === "auth/user-not-found",
          password: error.code === "auth/wrong-password",
        };
        setInputError(newInputError);
        setError("Incorrect email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const gUser = auth.currentUser;
      const userDocRef = doc(db, "users", gUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        await addDoc(collection(db, "users"), {
          uid: gUser.uid,
          fullname: gUser.displayName,
          email: gUser.email,
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="mainContent loginWrap">
      <div className="loginContainer">
        <div className="loginFormWrap">
          <form onSubmit={handleSubmit}>
            <h3 className="h3Login">Log in</h3>
            <div className="loginFormGroup">
              <label htmlFor="email">Email</label>
              <input
                className={inputError.email ? "input-error input-shake" : ""}
                style={inputError.email ? { border: "2px solid red" } : {}}
                type="email"
                name="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="loginFormGroup">
              <label htmlFor="password">Password</label>
              <input
                className={inputError.password ? "input-error input-shake" : ""}
                style={inputError.password ? { border: "2px solid red" } : {}}
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <button type="submit" className="loginBtn">
              Log in
            </button>
          </form>
          <Button onClick={handleGoogleSignIn} className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "block" }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span style={{ display: "none" }}>Sign in with Google</span>
            </div>
          </Button>
          {loading && <div> <Spinner animation="border" variant="secondary" /></div>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="noAccount">
            Don't have an account? <Link to="/register">Sign up</Link> now.
          </p>
        </div>
      </div>
    </div>
  );
}
