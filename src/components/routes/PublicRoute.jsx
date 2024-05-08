import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { usuario } = useAuth();

  if (usuario !== null) {
    return <Navigate to="/home" replace />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
