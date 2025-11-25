import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "../hooks/useForm";

const AUTH = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL || "",
});

async function apiLogin(email: string, password: string) {
  if (AUTH.defaults.baseURL) {
    const res = await AUTH.post("/login", { email, password });
    const data = res.data ?? {};
    const token =
      data.accessToken || data.token || data.result?.accessToken || "";
    if (!token) throw new Error(data.message || "로그인에 실패했습니다.");
    return { token };
  }
  await new Promise((r) => setTimeout(r, 600));
  const ok = /.+@.+\..+/.test(email) && password.length >= 6;
  if (!ok) throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  return { token: "mock-access-token" };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    isValid,
    submitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: { email: "", password: "" },
    validate: (v) => {
      const e: Record<string, string> = {};
      if (!v.email) e.email = "이메일을 입력해 주세요.";
      else if (!/.+@.+\..+/.test(v.email))
        e.email = "유효하지 않은 이메일 형식입니다.";
      if (!v.password) e.password = "비밀번호를 입력해 주세요.";
      else if (v.password.length < 6)
        e.password = "비밀번호는 최소 6자 이상이어야 합니다.";
      return e;
    },
    onSubmit: async (v) => {
      const { token } = await apiLogin(v.email, v.password);
      localStorage.setItem("access_token", token);
      alert("로그인 되었습니다!");
      navigate(-1);
    },
  });

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-800/50 border border-white/10 rounded-2xl p-6 text-white"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-white/80 hover:text-white"
        >
          ← 뒤로
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">로그인</h2>

        <button
          type="button"
          className="w-full h-10 rounded-md border border-white/20 hover:bg-white/10"
        >
          구글 로그인
        </button>

        <div className="my-3 text-center text-white/50 text-xs">OR</div>

        <div className="space-y-1">
          <input
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full h-10 rounded-md bg-neutral-900/70 border border-white/20 px-3 outline-none focus:border-white/40"
            autoComplete="email"
          />
          {touched.email && errors.email && (
            <p className="text-xs text-rose-400">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1 mt-3">
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full h-10 rounded-md bg-neutral-900/70 border border-white/20 px-3 outline-none focus:border-white/40"
            autoComplete="current-password"
          />
          {touched.password && errors.password && (
            <p className="text-xs text-rose-400">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="mt-4 w-full h-10 rounded-md bg-pink-500 disabled:opacity-40 hover:bg-pink-400 transition"
        >
          {submitting ? "로그인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
