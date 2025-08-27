const express = require('express');
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Anshul", age: 22 },
  { id: 2, name: "Adarsh", age: 21 },
  { id: 3, name: "Aarti", age: 23 }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
