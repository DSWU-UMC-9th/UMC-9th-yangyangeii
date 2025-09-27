import type { Task } from "../types/todo";
import { useTasks } from "../context/TodoContext";

export default function TodoItem({ task }: { task: Task }) {
  const { toggle, remove } = useTasks();

  const isDone = task.done;

  return (
    <li className="render-container__item">
      <span
        className="render-container__item-text"
        style={isDone ? { textDecoration: "line-through", opacity: 0.7 } : {}}
      >
        {task.text}
      </span>

      {isDone ? (
        <button
          className="render-container__item-button"
          onClick={() => remove(task.id)}
          title="삭제"
        >
          삭제
        </button>
      ) : (
        <button
          className="render-container__item-button"
          style={{ backgroundColor: "#28a745" }}
          onClick={() => toggle(task.id)}
          title="완료"
        >
          완료
        </button>
      )}
    </li>
  );
}
