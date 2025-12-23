// src/App.tsx
import "../index.css"; // ✅ 경로 수정: "../index.css" 아님! (src 안의 index.css)
import "../style.css"; // style.css가 루트에 있으면 그대로, src로 옮겼다면 "./style.css"로

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { TasksProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle(): void; setTheme(t: Theme): void };

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useTheme must be used within ThemeContext.Provider");
  return ctx;
}

function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 border
                 border-slate-300 dark:border-slate-600
                 bg-white dark:bg-slate-800
                 text-slate-700 dark:text-slate-200"
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "light"
  );

  useEffect(() => {
    // ✅ 다크 클래스 토글 + 로컬 저장(새로고침 유지)
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeValue = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      {/* 화면 전체 배경이 덮이도록 w-screen 사용 */}
      <div className="min-h-screen w-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-end mb-4">
            <ThemeToggleButton />
          </div>

          <TasksProvider>
            {/* 카드 배경/텍스트 다크 오버라이드 */}
            <div className="todo-container bg-white dark:!bg-slate-800 dark:!text-slate-100">
              <h1 className="todo-container__header">YANG TODO</h1>
              <TodoInput />
              <div
                className="render-container"
                style={{ gap: 20, justifyContent: "space-between" }}
              >
                <TodoList title="할 일" filter="todo" />
                <TodoList title="완료" filter="done" />
              </div>
            </div>
          </TasksProvider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
