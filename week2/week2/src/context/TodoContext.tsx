/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
// ⬇️ 네 프로젝트에 맞춰 한 쪽만 사용
import type { Task } from "../types/todo"; // (A) src/types.ts에 Task가 있을 때
// import type { Task } from "../types/todo"; // (B) src/types/todo.ts에 Task가 있을 때

type TasksContextValue = {
  tasks: Task[];
  todos: Task[];
  dones: Task[];
  add: (text: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
};

// strict 설정에서 안전한 패턴: undefined 초기값
export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const add = (text: string) =>
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);

  const toggle = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const remove = (id: number) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const { todos, dones } = useMemo(() => {
    const todos = tasks.filter((t) => !t.done);
    const dones = tasks.filter((t) => t.done);
    return { todos, dones };
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, todos, dones, add, toggle, remove }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}
