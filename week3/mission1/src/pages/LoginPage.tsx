import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // 👈 axiosInstance 불러오기 (src/api/axiosInstance.ts)

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, pw: false });

  const emailValid = isEmail(email);
  const pwValid = pw.length >= 6;
  const canSubmit = emailValid && pwValid && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitting(true);

      // ✅ 실제 로그인 API 요청 (AccessToken, RefreshToken 저장)
      const res = await api.post("/api/login", { email, password: pw });
      const { accessToken, refreshToken } = res.data;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      alert("로그인 성공! 🎉");
      nav("/"); // 홈 또는 이전 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 grid place-items-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-md p-6"
      >
        <div className="mb-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            ← 뒤로
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">로그인</h1>
        <p className="text-center text-sm text-neutral-500 mb-6">
          계정으로 계속하기
        </p>

        <button
          type="button"
          className="w-full h-10 rounded-md border border-neutral-300 bg-white hover:bg-neutral-50 transition mb-4"
        >
          구글 로그인
        </button>

        <div className="relative my-2 text-center">
          <span className="px-2 bg-white text-neutral-400 text-xs">OR</span>
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-neutral-200" />
        </div>

        {/* 이메일 */}
        <label className="block text-sm font-medium mb-1">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="이메일을 입력해 주세요"
          className="w-full h-10 rounded-md border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
        />
        {!emailValid && touched.email && (
          <p className="mt-1 text-xs text-red-600">
            올바른 이메일 형식을 입력해 주세요.
          </p>
        )}

        {/* 비밀번호 */}
        <label className="block text-sm font-medium mt-4 mb-1">비밀번호</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
          placeholder="비밀번호를 입력해 주세요"
          className="w-full h-10 rounded-md border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
        />
        {!pwValid && touched.pw && (
          <p className="mt-1 text-xs text-red-600">
            비밀번호는 6자 이상이어야 합니다.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 w-full h-10 rounded-md bg-fuchsia-500 text-white font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fuchsia-600 transition"
        >
          {submitting ? "로그인 중…" : "로그인"}
        </button>

        <div className="mt-4 text-center text-sm">
          계정이 없나요?{" "}
          <Link to="/signup" className="text-fuchsia-600 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
