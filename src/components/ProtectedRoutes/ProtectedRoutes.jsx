import { Navigate } from "react-router-dom";
function ProtectedRoutes({ children, redirectPath = "/", isAllowed }) {
  if (isAllowed) return children;

  return <Navigate to={redirectPath} />;
}

export default ProtectedRoutes;
