import { Navigate } from "react-router-dom";
import { getUser } from "../services/authService";

function ProtectedRoute({ children, allowedRole }) {

    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;