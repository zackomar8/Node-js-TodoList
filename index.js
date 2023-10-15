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
  console.log("create <task> - Create a new todo");
  console.log("update <id> <updatedTask> - Update the task of a todo");
  console.log("delete <id> - Delete a todo");
  console.log("search <term> - Search todos for a given term");
  console.log("list - Display all todos");
  console.log("exit - Exit the app");
  console.log();
};

// Display the Todo List
const displayTodoList = () => {
  const todos = todoList.getAllTodos();

  if (todos.length === 0) {
    console.log("No todos found.");
  } else {
    console.log("Todo List:");
    todos.forEach((todo) => {
      console.log(`[${todo.id}] ${todo.task}`);
    });
  }
  console.log();
};

// Display available operations and the Todo List
displayOperations();
displayTodoList();

// Handle user input
rl.on("line", (input) => {
  const command = input.split(" ")[0];
  const args = input.split(" ").slice(1);

  switch (command) {
    case "create":
      const newTask = args.join(" ");
      todoList.createTodo(newTask);
      todoList.saveToFile();
      console.log("Task created successfully!");
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
    case "search":
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
