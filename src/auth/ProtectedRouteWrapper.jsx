import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

function ProtectedRouteWrapper({ element: Component, ...rest }) {
    return (
        <Route
            {...rest}
            element={<ProtectedRoute component={Component} />}
        />
    );
}

export default ProtectedRouteWrapper;
