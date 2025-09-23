var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var todos = [];
var idCounter = 0;
var input = document.getElementById("todo-input");
var addBtn = document.getElementById("add-btn");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
// 추가
addBtn.addEventListener("click", function () {
    var text = input.value.trim();
    if (!text)
        return;
    var newTodo = { id: idCounter++, text: text, done: false };
    todos = __spreadArray([newTodo], todos, true);
    input.value = "";
    render();
});
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter")
        addBtn.click();
});
function markDone(id) {
    todos = todos.map(function (t) { return (t.id === id ? __assign(__assign({}, t), { done: true }) : t); });
    render();
}
function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    render();
}
function render() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.className = "todo__item";
        if (!todo.done) {
            // 할 일
            li.innerHTML = "\n        <span>".concat(todo.text, "</span>\n        <button class=\"todo__btn\" data-id=\"").concat(todo.id, "\">\uC644\uB8CC</button>\n      ");
            var btn = li.querySelector("button");
            btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () { return markDone(todo.id); });
            todoList.appendChild(li);
        }
        else {
            // 완료
            li.innerHTML = "\n        <span>".concat(todo.text, "</span>\n        <button class=\"todo__btn\" style=\"background:#b22222\" data-id=\"").concat(todo.id, "\">\uC0AD\uC81C</button>\n      ");
            var btn = li.querySelector("button");
            btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () { return deleteTodo(todo.id); });
            doneList.appendChild(li);
        }
    });
}
render();
