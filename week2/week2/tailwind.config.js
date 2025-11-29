/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class", // ✅ 중요: .dark 클래스로 다크모드 전환
  // corePlugins: { preflight: false }, // ← 네가 Preflight 끄고 싶으면 이 줄을 켜세요(선택)
  theme: { extend: {} },
  plugins: [],
};
