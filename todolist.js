const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function TodoList() {
  this.todos = [];
  this.loadFromFile();
}

TodoList.prototype.loadFromFile = function () {
  try {
    const data = fs.readFileSync("./todo-list.json", "utf8");
    this.todos = JSON.parse(data);
  } catch (error) {
    this.todos = [];
  }
};

TodoList.prototype.saveToFile = function () {
  fs.writeFileSync("./todo-list.json", JSON.stringify(this.todos), "utf8");
};

TodoList.prototype.getAllTodos = function () {
  return this.todos;
};

TodoList.prototype.createTodo = function (task) {
  const newTodo = {
    id: uuidv4(),
    task: task,
  };
  this.todos.push(newTodo);
};

TodoList.prototype.updateTodo = function (id, updatedTask) {
  const todo = this.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.task = updatedTask;
  }
};

TodoList.prototype.deleteTodo = function (id) {
  const index = this.todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    this.todos.splice(index, 1);
  }
};

TodoList.prototype.searchTodos = function (term) {
  return this.todos.filter(
    (todo) =>
      todo.task.toLowerCase().includes(term.toLowerCase()) ||
      todo.id === Number(term)
  );
};

module.exports = TodoList;
