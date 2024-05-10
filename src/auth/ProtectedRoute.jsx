import { auth, db } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

const ProtectedRoute = ({
  component: Component,
  adminOnly,
  userOnly,
  ...rest
}) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (user) {
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const adminUsers = usersSnapshot.docs.filter(
            (doc) => doc.data().isAdmin === true
          );
          const adminUserUids = adminUsers.map((doc) => doc.data().uid);
          setIsAdmin(adminUserUids.includes(user.uid));
        } else {
          console.error("User not found");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    if (!loading) {
      checkAdmin();
    }
  }, [user, loading]);

  console.log("isAdmin:", isAdmin);

  if (loading || isAdmin === null) {
    return (
      <Spinner
        animation="border"
        role="output"
        className="center"
        variant="info"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && isAdmin !== true) {
    return <Navigate to="/" replace />;
  }
  if (userOnly && isAdmin == true) {
    return <Navigate to="/admin-calendars" replace />;
  }

  return <Component isAdmin={isAdmin} {...rest} />;
};

export default ProtectedRoute;
