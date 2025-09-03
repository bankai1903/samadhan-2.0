// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory tasks storage
let todos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build To-Do App", completed: false }
];

// Routes
// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
