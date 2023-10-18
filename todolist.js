const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class TodoList {
  constructor() {
    this.todos = [];
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync("./todo-list.json", "utf8");
      this.todos = JSON.parse(data);
    } catch (error) {
      this.todos = [];
    }
  }

  saveToFile() {
    fs.writeFileSync("./todo-list.json", JSON.stringify(this.todos), "utf8");
  }

  getAllTodos() {
    return this.todos;
  }

  createTodo(task) {
    const newTodo = {
      id: uuidv4().slice(0, 3), // Truncate the UUID to 3 characters
      task: task,
    };
    this.todos.push(newTodo);
  }

  updateTodo(id, updatedTask) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.task = updatedTask;
    }
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id.toString() === id.toString());
    if (index !== -1) {
      this.todos.splice(index, 1);
      return "Task deleted successfully!";
    }
    return "Task not found.";
  }

  searchTodos(term) {
    return this.todos.filter(
      (todo) =>
        todo.task.toLowerCase().includes(term.toLowerCase()) ||
        todo.id === term
    );
  }
}

module.exports = TodoList;