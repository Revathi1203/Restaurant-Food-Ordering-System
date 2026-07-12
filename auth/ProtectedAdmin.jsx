import { Navigate } from "react-router-dom";
import { getRole } from "./auth";

function ProtectedAdmin({ children }) {

  const role = getRole();

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdmin;