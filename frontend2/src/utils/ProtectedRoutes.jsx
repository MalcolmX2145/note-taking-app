import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(AuthContext)

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;