import { useState, type FormEvent } from "react"; // ✅ type FormEvent 로!
import { useTasks } from "../context/TodoContext";

export default function TodoInput() {
  const { add } = useTasks();
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    add(t);
    setText("");
  };

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={onSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}
