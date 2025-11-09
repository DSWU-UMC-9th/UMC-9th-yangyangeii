import { Navigate, useLocation } from "react-router-dom";

function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const loc = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  return children;
}
