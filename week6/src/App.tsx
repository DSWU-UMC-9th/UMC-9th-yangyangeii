import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";

import LpListPage from "./pages/lp/LpListPage";
import LpDetailPage from "./pages/lp/LpDetailPage";
import LpCreatePage from "./pages/lp/LpCreatePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/lp" replace />} />
              <Route path="/lp" element={<LpListPage />} />
              <Route path="/lp/new" element={<LpCreatePage />} />{" "}
              <Route path="/lp/:lpId" element={<LpDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<Navigate to="/lp" replace />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>

      {/* 나중에 Devtools 쓰고 싶으면 주석 풀고 패키지 설치하면 됨
      <ReactQueryDevtools initialIsOpen={false} />
      */}
    </QueryClientProvider>
  );
}
