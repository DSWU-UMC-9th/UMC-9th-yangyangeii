import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    alert("로그인이 필요한 페이지입니다!");
    return <Navigate to="/login" replace />;
  }

  return children;
}
