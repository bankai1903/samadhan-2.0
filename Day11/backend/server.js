const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

let students = [
  { id: 1, name: "Aarav Sharma", email: "aarav.sharma@email.com", age: 20, course: "Computer Science" },
  { id: 2, name: "Priya Verma", email: "priya.verma@email.com", age: 21, course: "Information Technology" },
  { id: 3, name: "Rohan Patel", email: "rohan.patel@email.com", age: 22, course: "Electronics" },
  { id: 4, name: "Ananya Iyer", email: "ananya.iyer@email.com", age: 19, course: "Mechanical Engineering" },
  { id: 5, name: "Kabir Reddy", email: "kabir.reddy@email.com", age: 23, course: "Civil Engineering" }
];



app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, email, age, course } = req.body;
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    email,
    age,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, email, age, course } = req.body;
  student.name = name || student.name;
  student.email = email || student.email;
  student.age = age || student.age;
  student.course = course || student.course;

  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
