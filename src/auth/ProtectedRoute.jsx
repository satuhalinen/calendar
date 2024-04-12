import { auth, db } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setIsAdmin(userData.isAdmin);
                }
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) {
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

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
