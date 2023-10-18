const readline = require("readline");
const TodoList = require("./todolist");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todoList = new TodoList();

// Display available operations
const displayOperations = () => {
  console.log("Available Operations:");
  console.log("Save (the task) - Create a new task");
  console.log("update (id) <updatedTask> - Update the task of a task");
  console.log("delete (id) - Delete a task");
  console.log("find (term) - Search tasks for a given term");
  console.log("list - Display all tasks");
  console.log("exit - Exit the program");
  console.log();
};

// Display the Tasks
const displayTodoList = () => {
  const todos = todoList.getAllTodos();

  if (todos.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("Tasks List:");
    todos.forEach((todo) => {
      console.log(`[${todo.id}] ${todo.task}`);
    });
  }
  console.log();
};

// Display available operations and the Tasks List
displayOperations();
displayTodoList();

// Handle user input
rl.on("line", (input) => {
  const [command, ...args] = input.split(" ");

  switch (command) {
    case "save":
      const newTask = args.join(" ");
      todoList.createTodo(newTask);
      todoList.saveToFile();
      console.log("Task saved successfully!");
      break;
    case "update":
      const taskId = parseInt(args[0]);
      const updatedTask = args.slice(1).join(" ");
      if (isNaN(taskId)) {
        console.log("Invalid task ID!");
      } else {
        todoList.updateTodo(taskId, updatedTask);
        todoList.saveToFile();
        console.log("Task updated successfully!");
      }
      break;
    case "delete":
      const deleteId = parseInt(args[0]);
      if (isNaN(deleteId)) {
        console.log("Invalid task ID!");
      } else {
        todoList.deleteTodo(deleteId);
        todoList.saveToFile();
        console.log("Task deleted successfully!");
      }
      break;
    case "find":
      const searchTerm = args.join(" ");

      const searchResults = todoList.searchTodos(searchTerm);
      if (searchResults.length === 0) {
        console.log("No matching todos found.");
      } else {
        console.log("Matching Todos:");
        searchResults.forEach((todo) => {
          console.log(`[${todo.id}] ${todo.task}`);
        });
      }
      break;
    case "list":
      displayTodoList();
      break;
    case "exit":
      rl.close();
      break;
    default:
      console.log("Invalid command!");
  }
});

rl.on("close", () => {
  todoList.saveToFile();
  console.log("Goodbye!");
});