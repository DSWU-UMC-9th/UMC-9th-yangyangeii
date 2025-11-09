import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import Header from "./components/Header";
import LpListPage from "./pages/LpListPage";
import LpDetailPage from "./pages/LpDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./styles/global.css";

function Login() {
  return (
    <div style={{ maxWidth: 360, margin: "60px auto", color: "#ddd" }}>
      <h2>로그인</h2>
      <button
        onClick={() => {
          localStorage.setItem("accessToken", "demo");
          history.back();
        }}
      >
        임시 로그인
      </button>
    </div>
  );
}

function Signup() {
  return (
    <div style={{ maxWidth: 360, margin: "60px auto", color: "#ddd" }}>
      <h2>회원가입(모형)</h2>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LpListPage />} />
          <Route
            path="/lp/:id"
            element={
              <ProtectedRoute>
                <LpDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
