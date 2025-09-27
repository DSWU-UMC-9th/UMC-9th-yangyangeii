import "../style.css"; // 루트의 style.css 사용
import { TasksProvider } from "../src/context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <TasksProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
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
  );
}
