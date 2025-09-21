type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let todos: Todo[] = [];
let idCounter = 0;

const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 추가
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  const newTodo: Todo = { id: idCounter++, text, done: false };
  todos = [newTodo, ...todos];
  input.value = "";
  render();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

function markDone(id: number) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: true } : t));
  render();
}

function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

function render() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo__item";

    if (!todo.done) {
      // 할 일
      li.innerHTML = `
        <span>${todo.text}</span>
        <button class="todo__btn" data-id="${todo.id}">완료</button>
      `;
      const btn = li.querySelector("button") as HTMLButtonElement | null;
      btn?.addEventListener("click", () => markDone(todo.id));
      todoList.appendChild(li);
    } else {
      // 완료
      li.innerHTML = `
        <span>${todo.text}</span>
        <button class="todo__btn" style="background:#b22222" data-id="${todo.id}">삭제</button>
      `;
      const btn = li.querySelector("button") as HTMLButtonElement | null;
      btn?.addEventListener("click", () => deleteTodo(todo.id));
      doneList.appendChild(li);
    }
  });
}

render();
