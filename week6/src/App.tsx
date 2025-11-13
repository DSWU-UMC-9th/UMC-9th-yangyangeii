import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LpListPage from "./pages/lp/LpListPage";
import LpDetailPage from "./pages/lp/LpDetailPage";
import LpCreatePage from "./pages/lp/LpCreatePage";
import MyPage from "./pages/mypage/MyPage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/lp" element={<LpListPage />} />
              <Route path="/lp/create" element={<LpCreatePage />} />
              <Route path="/lp/:lpId" element={<LpDetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="*" element={<Navigate to="/lp" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
